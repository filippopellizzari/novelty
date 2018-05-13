from django.db import models
from django.dispatch import receiver
import os

class InputModel(models.Model):
    name = models.CharField(max_length=30)
    file_npz = models.FileField(upload_to='algos/input/')

    def __str__(self):
        return self.name

@receiver(models.signals.post_delete, sender=InputModel)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `InputModel` object is deleted.
    """
    if instance.file_npz:
        if os.path.isfile(instance.file_npz.path):
            os.remove(instance.file_npz.path)

@receiver(models.signals.pre_save, sender=InputModel)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `InputModel` object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_file = InputModel.objects.get(pk=instance.pk).file_npz
    except MediaFile.DoesNotExist:
        return False

    new_file = instance.file_npz
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)
