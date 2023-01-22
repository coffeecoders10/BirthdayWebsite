from flask import Flask
from flask import render_template, request
from flask import redirect, url_for
import json
import os

app = Flask(__name__)

@app.route("/", methods =["GET", "POST"])
def index():
    if request.method == "POST":
        user_name = request.form.get("user_name")
        password = request.form.get("password")
        with open(os.path.join(app.static_folder,'data\login.json')) as json_file:
            data = json.load(json_file)
        # for i in data:
        #     if i['user_name'] == user_name and i["password"] == password:
        #         print("inn")
        return redirect(url_for('profile'))
    return render_template("index.html")


@app.route("/profile")
def profile():
    return render_template("profile.html")

if __name__ == '__main__':
   app.run(debug=True)










# from flask import Flask, render_template, request, jsonify, redirect, url_for
# from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
#
# app = Flask(__name__)
# app.secret_key = "secret_key"
#
# # Configure the login manager
# login_manager = LoginManager()
# login_manager.init_app(app)
#
# class User(UserMixin):
#     def __init__(self, id, name, password):
#         self.id = id
#         self.name = name
#         self.password = password
#
#     def __repr__(self):
#         return f'<User {self.name}>'
#
# # Hard-coded list of users for the example. In a real-world application, you would store user information in a database
# users = [
#     User(1, 'admin', 'admin'),
#     User(2, 'user1', 'password1'),
#     User(3, 'user2', 'password2'),
# ]
#
# # Return the user object for a given ID
# @login_manager.user_loader
# def load_user(user_id):
#     for user in users:
#         if user.id == int(user_id):
#             return user
#     return None
#
# @app.route('/')
# def login():
#     return render_template('login.html')
#
# @app.route('/', methods=['POST'])
# def login_post():
#     user_name = request.form['user_name']
#     password = request.form['password']
#     # Search for the user in the list of users
#     user = next((x for x in users if x.name == user_name), None)
#     if user and user.password == password:
#         login_user(user)
#         return jsonify({"status":"success"})
#     else:
#         return jsonify({"status":"failure"})
#
# @app.route('/logout')
# @login_required
# def logout():
#     logout_user()
#     return redirect(url_for('login'))
#
# @app.route('/home')
# @login_required
# def home():
#     return jsonify({"status":"success", "user":current_user.name})
#
# if __name__ == '__main__':
#     app.run(debug=True)
