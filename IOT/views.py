from django.http import HttpResponse
from django.shortcuts import render, redirect
from . import templates
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib import auth
from login.models import object1
import requests

def home(request):
	obj = object1.objects.all()
	print(obj)
	li = []
	for i in obj:
		di = {}
		di['name'] = i.objectName
		di['description'] = i.description
		di['image'] = i.image
		di['id'] = i.objectID
		li.append(di)
	print(li)
	return render(request,'IOT/templates/index.html',{'obj':li})



def test(request):
	return render(request,'IOT/templates/test.html')

def obj(request,objectId):
	print(objectId)
	obj = object1.objects.get(objectID=objectId)
	print("Object is ",obj)
	di = {}
	di['name'] = obj.objectName
	di['description'] = obj.description
	di['image'] = obj.image
	di['detail'] = obj.detail
	try:
		url = "http://openlibrary.org/search.json?author=" + obj.description
		r = requests.get(url)
		r = r.json()['docs']
		r = r[:5]
		print(type(r))
		print(len(r))
		listOfOther = []
		for i in r:
			print(i['title_suggest'])
			listOfOther.append(i['title_suggest'])
	except:
		listOfOther = []
	print(listOfOther)
	di['list'] = listOfOther
	return render(request,"IOT/templates/object.html",{'obj':di})