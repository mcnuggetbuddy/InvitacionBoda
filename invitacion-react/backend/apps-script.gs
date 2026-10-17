const SHEET_ID = '1RZv2bw-KY0T8avlnVQHGdpMiAf3O7Km3z9YZVXPZsGI';
const SHEET_NAME = 'Respuestas';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    sheet.appendRow([
      new Date(),
      body.nombre || '',
      "'" + (body.telefono || ''),
      body.asiste ? 'Sí' : 'No',
      body.personas || '',
      body.acompanante1 || '',
      body.acompanante2 || '',
      body.acompanante3 || '',
      body.alergias || '',
      body.idioma || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'RSVP endpoint alive' }))
    .setMimeType(ContentService.MimeType.JSON);
}
