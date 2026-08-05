from django.db import models
from django.conf import settings

class CleanupDrive(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=255)
    date = models.DateField()
    time = models.CharField(max_length=100) # e.g. "7:00 AM - 10:00 AM"
    max_participants = models.IntegerField(default=50)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def participant_count(self):
        return self.registrations.count()

    def __str__(self):
        return f"{self.title} - {self.location} ({self.date})"

class DriveRegistration(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='drive_registrations')
    cleanup_drive = models.ForeignKey(CleanupDrive, on_delete=models.CASCADE, related_name='registrations')
    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'cleanup_drive')

    def __str__(self):
        return f"{self.user.name} registered for {self.cleanup_drive.title}"

class Certificate(models.Model):
    certificate_id = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='certificates')
    cleanup_drive = models.ForeignKey(CleanupDrive, on_delete=models.CASCADE, related_name='certificates')
    issued_at = models.DateTimeField(auto_now_add=True)
    qr_code_hash = models.CharField(max_length=100, blank=True)

    def save(self, *args, **kwargs):
        if not self.certificate_id:
            import random
            rand_num = random.randint(1000, 9999)
            self.certificate_id = f"CERT-2026-{rand_num}"
        if not self.qr_code_hash:
            import hashlib
            raw_str = f"{self.certificate_id}-{self.user_id}-{self.cleanup_drive_id}"
            self.qr_code_hash = hashlib.sha256(raw_str.encode()).hexdigest()[:16]
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.certificate_id} - {self.user.name} ({self.cleanup_drive.title})"
