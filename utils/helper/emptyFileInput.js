export function emptyFileInput() {
  const fileInput = document.getElementById('file-input-avatar');

  if (fileInput) {
    fileInput.value = '';
  }
}
