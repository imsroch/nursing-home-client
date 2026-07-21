/**
 * Pegá este código en Extensiones → Apps Script de tu Google Sheet.
 *
 * Setup:
 * 1. Creá una Sheet con headers en la fila 1:
 *    timestamp | vinculo | contacto | salud | motivos | cobertura | cud
 * 2. Pegá este script y guardá.
 * 3. Implementar → Nueva implementación → Tipo: Aplicación web
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquiera
 * 4. Copiá la URL (/exec) a .env.local como VITE_GOOGLE_SHEETS_URL
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.vinculo || "",
      data.contacto || "",
      data.salud || "",
      data.motivos || "",
      data.cobertura || "",
      data.cud || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: String(error) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Formulario Geriátrico Neuquén OK");
}
