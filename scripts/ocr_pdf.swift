import Foundation
import PDFKit
import Vision
import AppKit

let args = CommandLine.arguments
guard args.count >= 2 else {
    FileHandle.standardError.write("Usage: swift ocr_pdf.swift file.pdf [maxPages]\n".data(using: .utf8)!)
    exit(2)
}

let url = URL(fileURLWithPath: args[1])
let maxPages = args.count >= 3 ? Int(args[2]) : nil

guard let document = PDFDocument(url: url) else {
    FileHandle.standardError.write("Could not open PDF: \(url.path)\n".data(using: .utf8)!)
    exit(1)
}

func imageForPage(_ page: PDFPage) -> CGImage? {
    let bounds = page.bounds(for: .mediaBox)
    let scale: CGFloat = 2.2
    let width = Int(bounds.width * scale)
    let height = Int(bounds.height * scale)
    guard width > 0, height > 0 else { return nil }

    let colorSpace = CGColorSpaceCreateDeviceRGB()
    guard let context = CGContext(
        data: nil,
        width: width,
        height: height,
        bitsPerComponent: 8,
        bytesPerRow: 0,
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ) else { return nil }

    context.setFillColor(NSColor.white.cgColor)
    context.fill(CGRect(x: 0, y: 0, width: width, height: height))
    context.saveGState()
    context.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: context)
    context.restoreGState()
    return context.makeImage()
}

let pageLimit = min(maxPages ?? document.pageCount, document.pageCount)
var output: [String] = []

for index in 0..<pageLimit {
    guard let page = document.page(at: index), let image = imageForPage(page) else { continue }
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = true
    request.recognitionLanguages = ["ja-JP", "en-US"]

    let handler = VNImageRequestHandler(cgImage: image, options: [:])
    do {
        try handler.perform([request])
        let lines = (request.results ?? [])
            .compactMap { $0.topCandidates(1).first?.string }
        output.append("---- page \(index + 1) ----")
        output.append(contentsOf: lines)
    } catch {
        FileHandle.standardError.write("OCR failed on page \(index + 1): \(error)\n".data(using: .utf8)!)
    }
}

print(output.joined(separator: "\n"))
