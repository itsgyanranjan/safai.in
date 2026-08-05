from django.db import models

class Vehicle(models.Model):
    STATUS_CHOICES = (
        ('Active', 'Active'),
        ('Delayed', 'Delayed'),
        ('Maintenance', 'Maintenance'),
    )

    vehicle_number = models.CharField(max_length=50, unique=True)
    driver = models.CharField(max_length=100)
    latitude = models.FloatField(default=20.2961) # Bhubaneswar latitude default
    longitude = models.FloatField(default=85.8245) # Bhubaneswar longitude default
    route = models.CharField(max_length=150)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.vehicle_number} - {self.route} ({self.status})"

class Ward(models.Model):
    name = models.CharField(max_length=100, unique=True)
    cleanliness_score = models.IntegerField(default=90)
    total_complaints = models.IntegerField(default=0)
    resolved_complaints = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Ward {self.name} ({self.cleanliness_score}%)"
