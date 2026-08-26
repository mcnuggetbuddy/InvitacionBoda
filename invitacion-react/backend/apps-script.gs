/**
 * RSVP webhook for Isra y Pau wedding invitation.
 *
 * Setup steps:
 *   1. Create a new Google Sheet. First row must be these columns (in this order):
 *      Timestamp | Nombre | Telefono | Asiste | Personas | Acompanante1 | Acompanante2 | Acompanante3 | Alergias | Idioma
 *   2. Extensions -> Apps Script. Paste this entire file.
 *   3. Update SHEET_ID below with your sheet's ID (from its URL).
 *   4. Deploy -> New deployment -> Type: Web app.
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Copy the resulting /exec URL and paste it into your .env as VITE_RSVP_ENDPOINT.
 *   5. Any time you edit this script, create a new deployment (versioning).
 */

const SHEET_ID = '1RZv2bw-KY0T8avlnVQHGdpMiAf3O7Km3z9YZVXPZsGI';
const SHEET_NAME = 'Respuestas';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    const nextRow = sheet.getLastRow() + 1;
    const phoneCell = sheet.getRange(nextRow, 3);
    phoneCell.setNumberFormat('@');

    const values = [[
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
    ]];

    sheet.getRange(nextRow, 1, 1, values[0].length).setValues(values);

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
