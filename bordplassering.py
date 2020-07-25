from app import app, db
from app.models import User, Project, Allergy, Person

#print(User)

@app.shell_context_processor
def make_shell_context():
    print("TESTING")
    return {'db': db, 'User': User, 'Project': Project, 'Person':Person, 'Allergy':Allergy}


if __name__ =='__main__':
    app.run(host='0.0.0.0',port=5000)
#app.run(host='0.0.0.0',port=5000)