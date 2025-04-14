from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    published_date = models.DateField()
    isbn = models.CharField(max_length=13, unique=True)
    cover_image = models.ImageField(upload_to='covers/', blank=True, null=True)
    
    def __str__(self):
        return self.title