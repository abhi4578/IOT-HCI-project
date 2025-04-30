
# coding: utf-8

# In[1]:


import numpy as np
import pandas as pd
import os
import warnings
from keras.models import load_model
warnings.filterwarnings('ignore')
get_ipython().run_line_magic('matplotlib', 'inline')


# In[2]:


u_id=3  ### enter the user id


# In[3]:


dataset = pd.read_csv('goodbooks-10k/ratings.csv')


# In[4]:


books = pd.read_csv('goodbooks-10k/books.csv')


# In[5]:


if os.path.exists('regression_model.h5'):
    model = load_model('regression_model.h5')


# In[6]:


# Creating dataset for making recommendations for the first user
book_data = np.array(list(set(dataset.book_id)))


# In[7]:


user = np.array([u_id for i in range(len(book_data))])


# In[8]:


predictions = model.predict([user, book_data])
predictions = np.array([a[0] for a in predictions])
recommended_book_ids = (-predictions).argsort()[:5]


# In[9]:


books[books['id'].isin(recommended_book_ids)]



# In[24]:


# books[books['id'].isin(recommended_book_ids)]["isbn"]

