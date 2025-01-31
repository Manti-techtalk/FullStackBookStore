from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    published = models.DateTimeField(auto_now_add=True)
    bought = models.BooleanField(default=False)

    def __str__(self):
        return self.title