from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import os, json
app = Flask(__name__)
app.secret_key = "secret_key"
# current_user.name
UPLOAD_FOLDER = os.path.join(app.static_folder,'data')

# Configure the login manager
login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin):
    def __init__(self, id, name, password, data):
        self.id = id
        self.name = name
        self.password = password
        self.data = data

    def __repr__(self):
        return f'<User {self.name}>'

with open(os.path.join(app.static_folder,'data\login.json')) as json_file:
    data = json.load(json_file)
users = [User(i['id'], i['user_name'], i["password"], i["data"]) for i in data]
# Return the user object for a given ID
@login_manager.user_loader
def load_user(user_id):
    for user in users:
        if user.id == int(user_id):
            return user
    return None

@app.route('/')
def login():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def login_post():
    user_name = request.form['user_name']
    password = request.form['password']
    # Search for the user in the list of users
    user = next((x for x in users if x.name == user_name), None)
    if user and user.password == password:
        login_user(user)
        return redirect(url_for('profile'))
    else:
        return redirect(url_for('login'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/profile')
@login_required
def profile():
    return render_template("profile.html", result = {"name": users[current_user.id].name, "data": users[current_user.id].data, "id": users[current_user.id].id})

@app.route('/profile', methods=['POST'])
@login_required
def profile_post():
    # current_data = []
    # i = current_user.id
    bg_color = request.form['bg_color']
    current_data = {"bg_color": bg_color}

    text = request.form.getlist('text[]')
    text_align = request.form.getlist('text_align[]')
    font_size = request.form.getlist('font_size[]')
    border_style = request.form.getlist('border_style[]')
    text_bg_color = request.form.getlist('text_bg_color[]')
    text_color = request.form.getlist('text_color[]')
    border_color = request.form.getlist('border_color[]')

    n = len(text)
    order = [i for i in range(n)]
    for i in range(n):
        current_data[order[i]] = {
            "text": text[i],
            "textarea": text_align[i],
            "font_size": font_size[i],
            "border_style": border_style[i],
            "text_bg_color": text_bg_color[i],
            "text_color": text_color[i],
            "border_color": border_color[i]
        }

    image = request.files.getlist('image[]')
    l = len(image)
    order_img = [i for i in range(n, n + l)]
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER + "/img_1"
    for i in range(l):
        path = os.path.join(app.config['UPLOAD_FOLDER'], image[i].filename)
        current_data[order_img[i]] = {"image_path": path}
        image[i].save(path)

    users[current_user.id].data = current_data

    data[current_user.id]["data"] = current_data
    save_file = open(os.path.join(app.static_folder,'data\login.json'), "w")
    json.dump(data, save_file, indent = 4)
    save_file.close()
    return redirect(url_for('profile'))

if __name__ == '__main__':
    app.run(debug=True)
