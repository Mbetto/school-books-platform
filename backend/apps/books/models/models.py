from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    published_date = models.DateField()
    # cover_image = models.ImageField(upload_to='covers/')  # Remove temporarily
    
    def __str__(self):
        return self.title