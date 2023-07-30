from flask import Flask, jsonify, render_template,request,redirect, session, url_for
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from datetime import timedelta
import os
import qrcode
import io
import urllib.parse
import base64
import json
from flask_mysqldb import MySQL

with open ('config.json', 'r') as c:
    params = json.load(c)['parameters']

#mydb = mysql.connector.connect(host=params['host'], user=params["user"],password = params["password_sql"],database=params["database"])
app = Flask(__name__)

upload_folder = os.path.join('static', 'cart_images')

app.config['UPLOAD'] = upload_folder

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PORT'] = 3308
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'stickerparadise'


# app.config['MYSQL_HOST'] = 'Localhost'
# app.config['MYSQL_USER'] = 'stickerparadise'
# app.config['MYSQL_PASSWORD'] = 'Vineet3791@'
# app.config['MYSQL_DB'] = 'stickerparadise'


mysql = MySQL(app)
# flask login
app.secret_key = 'your_secret_key'
login_manager = LoginManager()
login_manager.login_view = 'home'
login_manager.init_app(app) 
class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id
        # self.is_active = True
    
    def get_id(self):
        return str(self.id)  # Ensure the user ID is a string
@login_manager.user_loader
def load_user(user_id):
    # Query your user model or data store to retrieve the user by ID
    return User(user_id)
app.config['SESSION_COOKIE_SECURE'] = True
app.config['REMEMBER_COOKIE_DURATION'] = timedelta(days=1)
# Set SESSION_COOKIE_HTTPONLY to True
app.config['SESSION_COOKIE_HTTPONLY'] = True


@app.route("/")
def home(): 
    # print(current_user.is_authenticated)
    user_agent = request.headers.get('User-Agent')
    is_mobile = 'Mobile' in user_agent
    if is_mobile:
        return render_template('home_mobile.html')
    else:
        return render_template('home.html')

@app.route("/terms_and_condition")
def terms_and_condition(): 
    # print(current_user.is_authenticated)
    return render_template('terms_condition.html')

@app.route("/privacy_policy")
def privacy_policy(): 
    # print(current_user.is_authenticated)
    return render_template('privacy_policy.html')

@app.route("/contact_us")
def contact_us(): 
    # print(current_user.is_authenticated)
    return render_template('contact_us.html')

@app.route("/unicorn", methods=['GET','POST'])
@login_required
def dashboardlogin(): 
    user_id = current_user.id
    print(user_id)
    if(str(user_id) == "3"):
            print("hi")
            return render_template('unicorn_dashboard.html')
    else:
        return redirect('/')
        # return render_template('unicorn_dashboard.html')


@app.route("/upload", methods=['GET','POST'])
def upload():
    if(request.method == "POST"):
        f = request.files['file']
        user_id = current_user.id
        cur = mysql.connection.cursor()
        sql="insert into cart (userid,quantity,price) values(%s, %s, %s)"
        condition = (user_id,1,params["sheet_price"])
        cur.execute(sql,condition)
        mysql.connection.commit()
        sql=" SELECT cartid FROM cart ORDER BY cartid DESC LIMIT 1"
        cur.execute(sql)
        data = cur.fetchall()
        sql="update cart set filename=%s where cartid=%s"
        condition = (data[0][0],data[0][0])
        cur.execute(sql,condition)
        mysql.connection.commit()
        path= str(data[0][0])+".png"
        f.save(os.path.join(app.config['UPLOAD'], path))
        response_data = {'success': True, 'message': 'sucessfull'}
        return response_data
        
@app.route("/log_out", methods=['GET','POST'])
@login_required
def logout():
    logout_user()
    response_data = {'success': True, 'message': 'notlogin'}
    return jsonify(response_data)

@app.route("/custumize" , methods=['GET','POST'])
# @login_required
def custumize():
    # user_id = current_user.id
    user_agent = request.headers.get('User-Agent')
    is_mobile = 'Mobile' in user_agent
    if is_mobile:
        return render_template('stickereditor.html')
    else:
        return render_template('stickereditor.html')

@app.route("/pre_design" , methods=['GET','POST'])
# @login_required
def pre_design():
    # user_id = current_user.id
    user_agent = request.headers.get('User-Agent')
    is_mobile = 'Mobile' in user_agent
    if is_mobile:
        return render_template('pre_design_mobile.html')
    else:
        return render_template('predesign.html')

@app.route("/my_account" , methods=['GET','POST'])
@login_required
def my_account():
    user_id = current_user.id
    cur = mysql.connection.cursor()
    sql = "select name,adress1,adress2,state,pincode,mobilenumber from users where userid=%s"
    condition = (user_id,)
    cur.execute(sql,condition)
    adress = cur.fetchall()
    sql = "select CAST(orderdate AS DATE),orderid,CONVERT(filename, CHAR) as filename,orderstatus,quantity,total,payment_verification from orders where userid=%s order by orderdate"
    condition = (user_id,)
    cur.execute(sql,condition)
    orderhist = cur.fetchall()
    user_agent = request.headers.get('User-Agent')
    is_mobile = 'Mobile' in user_agent
    if is_mobile:
        return render_template("my_account_mobile.html",adress=adress,orderhist=orderhist)
    else:
        return render_template("myaccount.html",adress=adress,orderhist=orderhist)

@app.route("/cart" , methods=['GET','POST'])
@login_required
def cart():
    user_id = current_user.id
    cur = mysql.connection.cursor()
    sql="select cartid,price,quantity,price*quantity,CONVERT(filename, CHAR) as total from cart where userid=%s"
    condition = (user_id,)
    cur.execute(sql,condition)
    data = cur.fetchall()
    # print(data)
    cart_items = data
    sql = "select sum(quantity*price) as total from cart where userid=%s;"
    cur.execute(sql,condition)
    total = cur.fetchall()
    sql = "select name,adress1,adress2,state,pincode,mobilenumber from users where userid=%s"
    cur.execute(sql,condition)
    adress = cur.fetchall()
    user_agent = request.headers.get('User-Agent')
    is_mobile = 'Mobile' in user_agent
    if is_mobile:
        return render_template("cart_mobile.html",cart_items=cart_items,total=total[0][0],adress=adress)
    else:
         return render_template("cart.html",cart_items=cart_items,total=total[0][0],adress=adress)

@app.route("/get_images/<tab_name>")
def get_images(tab_name):
    print(tab_name)
    image_set_path = os.path.join("static", tab_name)
    images = [img for img in os.listdir(image_set_path) if img.lower().endswith((".png", ".jpg", ".jpeg"))]
    return jsonify(images)

@app.route("/pre_built")
def pre_built():
    image_set_path = os.path.join("static/cart_images", "pre_built")
    images = [img for img in os.listdir(image_set_path) if img.lower().endswith((".png", ".jpg", ".jpeg"))]
    return jsonify(images)

@app.route("/add_to_cart",methods=['GET','POST'])
@login_required
def add_to_cart():
    credentials = request.data.decode('utf-8')
    filename = "/pre_built/"+credentials
    user_id = current_user.id
    cur = mysql.connection.cursor()
    sql="insert into cart (userid,quantity,price) values(%s, %s, %s)"
    condition = (user_id,1,params["sheet_price"])
    cur.execute(sql,condition)
    mysql.connection.commit()
    sql=" SELECT cartid FROM cart ORDER BY cartid DESC LIMIT 1"
    cur.execute(sql)
    data = cur.fetchall()
    sql="update cart set filename=%s where cartid=%s"
    condition = (filename,data[0][0])
    cur.execute(sql,condition)
    mysql.connection.commit()
    response_data = {'success': True, 'message': 'sucessfull'}
    return response_data


@app.route("/update_cart" , methods=['GET','POST'])
@login_required
def update_cart():
    user_id = current_user.id
    data = request.get_json()
    cart_id = data.get('cart_id')
    quantity = data.get("quantity")
    type = data.get("type")
    if(type=="decrement"):
        cur = mysql.connection.cursor()
        sql="update cart set quantity=%s where cartid=%s"
        condition = (int(quantity)-1,cart_id)
        cur.execute(sql,condition)
        mysql.connection.commit()
        response_data = {'success': True, 'message': 'decrement'}
        return jsonify(response_data)
    elif(type=="increment"):
        cur = mysql.connection.cursor()
        sql="update cart set quantity=%s where cartid=%s"
        condition = (int(quantity)+1,cart_id)
        cur.execute(sql,condition)
        mysql.connection.commit()
        response_data = {'success': True, 'message': 'increment'}
        return jsonify(response_data)
    elif(type=="delete"):
        cur = mysql.connection.cursor()
        sql="delete from cart where cartid=%s"
        condition = (int(cart_id),)
        path= str(cart_id)+".png"
        if os.path.exists(os.path.join(app.config['UPLOAD'], path)):
            os.remove(os.path.join(app.config['UPLOAD'], path))
            cur.execute(sql,condition)
            mysql.connection.commit()
        else:
            cur.execute(sql,condition)
            mysql.connection.commit()
            print("The file does not exist")
        response_data = {'success': True, 'message': 'increment'}
        return jsonify(response_data)
    # print(cart_id,quantity,type)
    response_data = {'success': True, 'message': 'notlogin'}
    return jsonify(response_data)
    

@app.route('/api/logincheck', methods=['POST'])
def api_logincheck():
    credentials = request.data.decode('utf-8')
    # Perform authentication or verification logic
    if credentials == 'logincheck':
        # login is valid or not
        if(current_user.is_authenticated):
            user_id = current_user.id
            response_data = {'success': True, "user": str(user_id)}
        else:
            response_data = {'success': False, 'message': 'notlogin'}
    return jsonify(response_data)

@app.route('/api/login', methods=['POST'])
def api_login():
    credentials = request.json
    # Get the username and password from the credentials
    username = credentials.get('name')
    email = credentials.get('email')
    password = credentials.get('password')
    logintype = credentials.get('logintype')
    value = [username,email,password,logintype]
    # print(value)
    response_data=loginuser(value)
    if(response_data["success"]):
        user = User(response_data.pop("user"))
        login_user(user)
        return jsonify(response_data)
    else:
        return jsonify(response_data)

def loginuser(values):
    cur = mysql.connection.cursor()
    sql="select password from users where email= %s"
    condition = (values[1],)
    cur.execute(sql,condition)
    # mysql.connection.commit()
    data = cur.fetchall()
    if(values[3]=="signin"):
        if(len(data)==0):
            response_data = {'success': False, 'message': 'email not found'}
            return response_data
        else:
            if(data[0][0]==values[2]):
                sql="select userid from users where email= %s"
                condition = (values[1],)
                cur.execute(sql,condition)
                # mysql.connection.commit()
                data = cur.fetchall()
                response_data = {'success': True, 'message': 'Login successfull', "user": data[0][0]}
                return response_data
            else:
                response_data = {'success': False, 'message': 'password did not match'}
                return response_data
    else:
        if(len(data)==0):
            sql="insert into users (name, email, password) values(%s, %s, %s)"
            condition = (values[0],values[1],values[2])
            cur.execute(sql,condition)
            mysql.connection.commit()
            sql="select userid from users where email= %s"
            condition = (values[1],)
            cur.execute(sql,condition)
            data = cur.fetchall()
            response_data = {'success': True, 'message': 'Login successfull', "user": data[0][0]}
            return response_data
        else:
            response_data = {'success': False, 'message': 'email already a user'}
            return response_data
        
@app.route('/update_adress', methods=['POST'])
def update_adress():
    user_id = current_user.id
    form_data = request.json
    name = form_data['name']
    address1 = form_data['address1']
    address2 = form_data['address2']
    state = form_data['state']
    pincode = form_data['pincode']
    mobileNumber = form_data['mobileNumber']
    # print(name,address1,address2,state,pincode,mobileNumber)
    cur = mysql.connection.cursor()
    sql="update users set name=%s,adress1=%s,adress2=%s,pincode=%s,state=%s,mobilenumber=%s where userid=%s"
    condition = (name,address1,address2,pincode,state,mobileNumber,user_id)
    cur.execute(sql,condition)
    mysql.connection.commit()
    response = {'message': True}
    return jsonify(response)

# dashboard logic
@app.route('/order_search',methods=['GET','POST'])
def order_search():
    user_id = request.json.get('userId')
    cur = mysql.connection.cursor()
    # print(user_id)
    sql="select DATE(orderdate) AS orderdate,orderstatus,CONVERT(filename, CHAR) as filename,quantity,orderid from orders where userid=%s and orderstatus=%s"
    condition = (user_id,"printing")
    cur.execute(sql,condition)
    data = cur.fetchall()
    sql = "select name,adress1,adress2,state,pincode,mobilenumber,email from users where userid=%s"
    condition = (user_id,)
    cur.execute(sql,condition)
    adress =  cur.fetchall()
    return jsonify(data=data,adress=adress)

@app.route('/order_done',methods=['GET','POST'])
def order_done():
    orderid = request.json.get('orderid')
    cur = mysql.connection.cursor()
    # print(orderid)
    sql="update orders set orderstatus=%s where orderid=%s;"
    condition = ("couriered",orderid)
    cur.execute(sql,condition)
    mysql.connection.commit()
    response_data = {'success': True, 'message': 'notlogin'}
    return jsonify(response_data)

@app.route('/payment_detail',methods=['GET','POST'])
def payment_detail():
    # orderid = request.json.get('orderid')
    cur = mysql.connection.cursor()
    sql="SELECT o.orderdate,o.orderid, o.userid,o.sender_name,u.mobilenumber,u.email,o.total FROM orders o JOIN users u ON o.userid = u.userid WHERE o.payment_verification = 'pending';"
    cur.execute(sql)
    data = cur.fetchall()
    # mysql.connection.commit()
    return jsonify(data)

@app.route('/order_reject',methods=['GET','POST'])
def order_reject():
    orderid = request.json.get('orderid')
    cur = mysql.connection.cursor()
    # print(orderid)
    sql="update orders set payment_verification=%s where orderid=%s;"
    condition = ("rejected",orderid)
    cur.execute(sql,condition)
    mysql.connection.commit()
    response_data = {'success': True, 'message': 'notlogin'}
    return jsonify(response_data)

@app.route('/order_verified',methods=['GET','POST'])
def order_verified():
    orderid = request.json.get('orderid')
    cur = mysql.connection.cursor()
    # print(orderid)
    sql="update orders set payment_verification=%s where orderid=%s;"
    condition = ("verified",orderid)
    cur.execute(sql,condition)
    mysql.connection.commit()
    response_data = {'success': True, 'message': 'notlogin'}
    return jsonify(response_data)

@app.route('/download_order',methods=['GET','POST'])
def download_order():
    quantity = request.json.get('quantity')
    cur = mysql.connection.cursor()
    sql=" select orderdate,quantity,filename,orderid,userid from orders where payment_verification=%s and orderstatus=%s and quantity=%s;"
    condition = ("verified","processing",quantity)
    cur.execute(sql,condition)
    data = cur.fetchall()
    sql=" select distinct(quantity) from orders where payment_verification=%s and orderstatus=%s"
    condition = ("verified","processing")
    cur.execute(sql,condition)
    dis_quan = cur.fetchall()
    combined_tuple = sum(dis_quan, ())
    return jsonify(data,combined_tuple)

@app.route('/order_printing',methods=['GET','POST'])
def order_printing():
    orderid = request.json.get('orderid')
    cur = mysql.connection.cursor()
    # print(orderid)
    sql="update orders set orderstatus=%s where orderid=%s;"
    condition = ("printing",orderid)
    cur.execute(sql,condition)
    mysql.connection.commit()
    response_data = {'success': True, 'message': 'notlogin'}
    return jsonify(response_data)

@app.route('/order_stats',methods=['GET','POST'])
def order_stats():
    stats = request.json.get('stats')
    cur = mysql.connection.cursor()
    sql="select count(orderid) from orders where orderstatus=%s;"
    condition = ("couriered",)
    cur.execute(sql,condition)
    orderdelivered = cur.fetchall()
    sql="select count(orderid) from orders where orderstatus=%s;"
    condition = ("printing",)
    cur.execute(sql,condition)
    pendingforprinting = cur.fetchall()
    sql="select count(orderid) from orders where payment_verification=%s;"
    condition = ("pending",)
    cur.execute(sql,condition)
    verifypayment = cur.fetchall()
    sql="select sum(total) from orders where payment_verification=%s and orderstatus=%s;"
    condition = ("verified","couriered")
    cur.execute(sql,condition)
    income = cur.fetchall()
    sql="select date(orderdate) ,count(payment_verification) from orders group by date(orderdate);"
    cur.execute(sql)
    no_of_orders = cur.fetchall()
    print(no_of_orders)
    response_data = {'success': True,'orderdelivered':str(orderdelivered[0][0]),'pendingprint':str(pendingforprinting[0][0]),'verify':str(verifypayment[0][0]),'income':str(income[0][0])}
    return jsonify(response_data,no_of_orders)
    # return jsonify(data)


def save_upi_qr_code(upi_id, amount, recipient_name, recipient_message):
    # Encode the recipient_message and recipient_name parameters for the UPI payment string
    encoded_message = urllib.parse.quote(recipient_message)
    encoded_name = urllib.parse.quote(recipient_name)

    # Create the payment string in the UPI format
    payment_string = f"upi://pay?pa={upi_id}&pn={encoded_name}&mc=&tid=&tr=&tn={encoded_message}&am={amount}&cu=INR"

    # Generate the QR code
    qr_code = qrcode.make(payment_string)
    buffered = io.BytesIO()
    qr_code.save(buffered, format="PNG")
    qr_code_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return qr_code_base64 


@app.route('/generate_qr_code',methods=['GET','POST'])
@login_required
def generate_qr_code():
    user_id = current_user.id
    cur = mysql.connection.cursor()
    sql = "select sum(quantity*price) as total from cart where userid=%s;"
    condition = (user_id,)
    cur.execute(sql,condition)
    total = cur.fetchall()
    upi_id = params["upi_id"]
    amount = str(total[0][0])
    recipient_name = "Sticker paradise"
    recipient_message = "Thank you for your payment!"
    qrcode = save_upi_qr_code(upi_id, amount, recipient_name, recipient_message)
    return jsonify({'qr_code_base64': qrcode})

@app.route("/upi_mobile", methods=['GET','POST'])
@login_required
def upi_mobile(): 
    user_id = current_user.id
    cur = mysql.connection.cursor()
    sql = "select sum(quantity*price) as total from cart where userid=%s;"
    condition = (user_id,)
    cur.execute(sql,condition)
    total = cur.fetchall()
    receiver_vpa = params["upi_id"]
    payment_amount = str(total[0][0])
    payment_note = "Sticker paradise"
    payee_name = "Sticker paradise"
    upi_link = generate_upi_link(receiver_vpa, payee_name, payment_note, payment_amount, "INR")
    response_data = {'success': True, 'message': upi_link}
    # print("done")
    print(response_data)
    return jsonify(response_data)

def generate_upi_link(payee_address, payee_name, transaction_note, amount, currency_unit):
    upi_params = {
        'pa': payee_address,
        'pn': payee_name,
        'tn': transaction_note,
        'am': amount,
        'cu': currency_unit
    }
    # Encode the parameters and create the UPI link
    upi_query_params = urllib.parse.urlencode(upi_params)
    upi_link = f"upi://pay?{upi_query_params}"
    return upi_link

@app.route('/ordered',methods=['GET','POST'])
@login_required
def ordered():
    user_id = current_user.id
    sender = request.json.get('sender')
    cur = mysql.connection.cursor()
    sql = "select cartid,userid,filename,quantity,quantity*price as total from cart where userid=%s"
    condition = (user_id,)
    cur.execute(sql,condition)
    cart = cur.fetchall()
    for item in cart:
        sql = "insert into orders (userid,filename,quantity,total,sender_name) values(%s,%s,%s,%s,%s)"
        condition = (user_id,item[2],item[3],item[4],sender)
        cur.execute(sql,condition)
        mysql.connection.commit()
        sql = "delete from cart where cartid=%s"
        condition = (item[0],)
        cur.execute(sql,condition)
        mysql.connection.commit()
    response_data = {'success': True, 'message': 'notlogin'}
    # print("done")
    return jsonify(response_data)




app.run(debug= True)



