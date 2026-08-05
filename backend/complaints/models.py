import random
from django.db import models
from django.conf import settings

class Complaint(models.Model):
    CATEGORY_CHOICES = (
        ('Garbage Accumulation', 'Garbage Accumulation'),
        ('Street Cleaning', 'Street Cleaning'),
        ('Open Dumping', 'Open Dumping'),
        ('Overflowing Dustbin', 'Overflowing Dustbin'),
        ('Missed Waste Collection', 'Missed Waste Collection'),
        ('Other', 'Other'),
    )

    PRIORITY_CHOICES = (
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
    )

    STATUS_CHOICES = (
        ('SUBMITTED', 'Submitted'),
        ('ASSIGNED', 'Assigned'),
        ('IN_PROGRESS', 'In Progress'),
        ('RESOLVED', 'Resolved'),
    )

    complaint_id = models.CharField(max_length=20, unique=True, editable=False)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    image = models.ImageField(upload_to='complaints/', null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    address = models.CharField(max_length=255)
    ward = models.CharField(max_length=100, blank=True, default='Vijay Nagar')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='MEDIUM')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='SUBMITTED')
    reported_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='complaints')
    assigned_team = models.CharField(max_length=100, blank=True, default='Unassigned')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.complaint_id:
            while True:
                rand_num = random.randint(10000, 99999)
                candidate_id = f"SAF-2026-{rand_num}"
                if not Complaint.objects.filter(complaint_id=candidate_id).exists():
                    self.complaint_id = candidate_id
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.complaint_id} - {self.category} ({self.status})"

class Assignment(models.Model):
    STATUS_CHOICES = (
        ('Assigned', 'Assigned'),
        ('Accepted', 'Accepted'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
        ('Verified', 'Verified'),
    )

    complaint = models.OneToOneField(Complaint, on_delete=models.CASCADE, related_name='assignment')
    worker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assignments')
    assigned_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='assigned_tasks')
    assigned_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    completion_notes = models.TextField(blank=True)
    before_image = models.ImageField(upload_to='proof_images/', null=True, blank=True)
    after_image = models.ImageField(upload_to='proof_images/', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Assigned')

    def __str__(self):
        return f"Assignment: {self.complaint.complaint_id} -> {self.worker.name} ({self.status})"

class Feedback(models.Model):
    complaint = models.OneToOneField(Complaint, on_delete=models.CASCADE, related_name='feedback')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.IntegerField(default=5)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for {self.complaint.complaint_id} - Rating: {self.rating}"
