from django.db import models
from django.contrib.auth.models import User

class object(models.Model):
	objectName = models.CharField(max_length=100, null=False,default=None)
	objectID = models.CharField(max_length=100, null=False,default=None,primary_key=True)
	#objectReader = models.CharField(max_length=100, null=False,default=None)
	description = models.CharField(max_length=100, null=True,default='')
	image = models.CharField(max_length=300, null=False,default=None)


class reader(models.Model):
	readerID = models.CharField(max_length=100, null=False,default=None,primary_key=True)
	locationX = models.CharField(max_length=10,null=False,default='')
	locationY = models.CharField(max_length=10,null=False,default='')
	

# class ARMarker(models.Model):

# reader 3812211418

# reader 18914816187

# reader 238710653

# reader 23874624