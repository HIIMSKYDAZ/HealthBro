using Karbantarto.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;

namespace Karbantarto.Services
{
    internal class FileUploadService
    {
        public static string Ftp(HttpClient httpClient, string imagePath)
        {
            try
            {
                string imageFileName = "default.jpg";
                string url = $"{httpClient.BaseAddress}FileUpload/FtpServer";
                using (HttpClient client = new HttpClient())
                using (MultipartFormDataContent formData = new MultipartFormDataContent())
                using (FileStream fileStream = new FileStream(imagePath, FileMode.Open, FileAccess.Read))
                using (StreamContent imageContent = new StreamContent(fileStream))
                {
                    string mimeType = GetMimeType(imagePath);
                    imageContent.Headers.ContentType = new MediaTypeHeaderValue(mimeType);
                    formData.Add(imageContent, "file", Path.GetFileName(imagePath));
                    HttpResponseMessage response = client.PostAsync(url, formData).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        imageFileName = response.Content.ReadAsStringAsync().Result;
                        MessageBox.Show("Kép sikeresen feltöltve!");
                    }
                    else
                    {
                        MessageBox.Show($"Hiba történt: {response.StatusCode}");
                    }
                    return imageFileName;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        static string GetMimeType(string filePath)
        {
            string extension = Path.GetExtension(filePath).ToLower();
            return extension switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".bmp" => "image/bmp",
                ".webp" => "image/webp",
                _ => "application/octet-stream", // Ha ismeretlen a típus
            };
        }
    }
}
