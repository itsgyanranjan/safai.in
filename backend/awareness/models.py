from django.db import models
from django.conf import settings

class Campaign(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200, default='Bhubaneswar Wide')
    duration = models.CharField(max_length=100, default='7 Days')
    banner_url = models.CharField(max_length=500, blank=True, default='https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80')
    participants_count = models.IntegerField(default=120)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.location})"

class EducationalPoster(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100, default='Waste Segregation')
    image_url = models.CharField(max_length=500, default='https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80')
    download_count = models.IntegerField(default=45)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class EnvironmentalTip(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default='Daily Habits')
    tip_text = models.TextField()
    icon_name = models.CharField(max_length=50, default='Leaf')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class QuizQuestion(models.Model):
    CORRECT_CHOICES = (
        ('A', 'Option A'),
        ('B', 'Option B'),
        ('C', 'Option C'),
        ('D', 'Option D'),
    )

    question = models.TextField()
    option_a = models.CharField(max_length=200)
    option_b = models.CharField(max_length=200)
    option_c = models.CharField(max_length=200)
    option_d = models.CharField(max_length=200)
    correct_option = models.CharField(max_length=2, choices=CORRECT_CHOICES, default='A')
    explanation = models.TextField(blank=True)
    reward_points = models.IntegerField(default=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Quiz: {self.question[:40]}..."

class Article(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default='Waste Management')
    author = models.CharField(max_length=100, default='SAFAI Environmental Cell')
    read_time = models.CharField(max_length=50, default='3 min read')
    summary = models.TextField()
    content = models.TextField()
    image_url = models.CharField(max_length=500, default='https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
