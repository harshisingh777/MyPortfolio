import PyPDF2

def get_links_from_pdf(file_path):
    with open(file_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            if "/Annots" in page:
                annots = page["/Annots"]
                for annot in annots:
                    obj = annot.get_object()
                    if "/A" in obj and "/URI" in obj["/A"]:
                        print(obj["/A"]["/URI"])

get_links_from_pdf("Harshi_Singh_Resume.pdf")
