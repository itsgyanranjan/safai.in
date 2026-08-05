from django.db import models

class Hotspot(models.Model):
    RISK_CHOICES = (
        ('HIGH', 'High Risk'),
        ('MEDIUM', 'Medium Risk'),
        ('LOW', 'Low Risk'),
    )

    ward = models.CharField(max_length=100)
    area = models.CharField(max_length=150)
    risk_level = models.CharField(max_length=10, choices=RISK_CHOICES, default='MEDIUM')
    complaint_count = models.IntegerField(default=0)
    primary_category = models.CharField(max_length=100, default='Garbage Accumulation')
    reason = models.TextField(help_text="AI explanation of why area is classified at this risk level")
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.ward} ({self.area}) - {self.risk_level}"

class Recommendation(models.Model):
    PRIORITY_CHOICES = (
        ('HIGH', 'High'),
        ('MEDIUM', 'Medium'),
        ('LOW', 'Low'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    ward = models.CharField(max_length=100, blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='MEDIUM')
    is_acknowledged = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Recommendation: {self.title} [{self.priority}]"

class AIReport(models.Model):
    title = models.CharField(max_length=200, default="Weekly Cleanliness Report")
    period_start = models.DateField(null=True, blank=True)
    period_end = models.DateField(null=True, blank=True)
    total_complaints = models.IntegerField(default=0)
    resolved_count = models.IntegerField(default=0)
    pending_count = models.IntegerField(default=0)
    highest_category = models.CharField(max_length=100, default='Garbage Accumulation')
    highest_risk_ward = models.CharField(max_length=100, default='Vijay Nagar')
    summary_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.created_at.strftime('%Y-%m-%d')})"

class PredictionHistory(models.Model):
    input_text = models.TextField()
    predicted_category = models.CharField(max_length=100)
    predicted_priority = models.CharField(max_length=10)
    confidence_score = models.FloatField(default=0.85)
    user_accepted = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction for: '{self.input_text[:30]}...' -> {self.predicted_category}"
