import * as XLSX from 'xlsx';
import path from 'path';

export function getE2ETestData(fileName = 'e2eData.xlsx'): any[] {
  const filePath = path.join(__dirname, '..', 'data', fileName);
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  return jsonData.map((row: any) => ({
    testName: row.testName,
    user: {
      email: row.email,
      firstName: row.firstName,
      lastName: row.lastName,
      street: row.street,
      city: row.city,
      zipCode: row.zipCode,
      country: row.country,
      phone: row.phone,
    },
    product: {
      category: row.category,
      subCategory: row.subCategory,
      filters: {
        Color: row.Color,
        Size: row.Size,
      },
      size: row.size,
      color: row.color,
      quantity: Number(row.quantity),
    },
    discountCode: row.discountCode,
  }));
}
