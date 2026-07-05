$root = "c:\Users\JAYDIP B VIRJA\Desktop\MADHAV_TECHNO_CAST"
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Local Server Running!" -ForegroundColor Green
Write-Host "  Open: http://localhost:$port" -ForegroundColor Yellow
Write-Host "  Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $req = $context.Request
    $res = $context.Response
    $urlPath = $req.Url.LocalPath
    if ($urlPath -eq "/") { $urlPath = "/index.html" }
    $filePath = Join-Path $root ($urlPath -replace "/", "\")
    
    if (Test-Path $filePath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mimeTypes = @{
            ".html" = "text/html; charset=utf-8"
            ".css"  = "text/css"
            ".js"   = "application/javascript"
            ".json" = "application/json"
            ".png"  = "image/png"
            ".jpg"  = "image/jpeg"
            ".jpeg" = "image/jpeg"
            ".gif"  = "image/gif"
            ".svg"  = "image/svg+xml"
            ".ico"  = "image/x-icon"
            ".pdf"  = "application/pdf"
            ".woff" = "font/woff"
            ".woff2"= "font/woff2"
            ".ttf"  = "font/ttf"
            ".xml"  = "application/xml"
            ".txt"  = "text/plain"
        }
        if ($mimeTypes.ContainsKey($ext)) {
            $res.ContentType = $mimeTypes[$ext]
        } else {
            $res.ContentType = "application/octet-stream"
        }
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host "200 $($req.HttpMethod) $urlPath" -ForegroundColor Green
    } else {
        $res.StatusCode = 404
        $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
        $res.ContentLength64 = $body.Length
        $res.OutputStream.Write($body, 0, $body.Length)
        Write-Host "404 $($req.HttpMethod) $urlPath" -ForegroundColor Red
    }
    $res.OutputStream.Close()
}
