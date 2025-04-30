from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class object1(models.Model):
	objectName = models.CharField(max_length=100, null=False,default=None)
	objectID = models.CharField(max_length=100, null=False,default=None,primary_key=True)
	#objectReader = models.CharField(max_length=100, null=False,default=None)
	description = models.CharField(max_length=100, null=True,default='')
	image = models.CharField(max_length=300, null=False,default=None)
	detail = models.CharField(max_length=4000,default='')