# models.py
from django.db import models
from datetime import date

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    published_date = models.DateField(default=date.today)

    def __str__(self):
        return self.title
2

