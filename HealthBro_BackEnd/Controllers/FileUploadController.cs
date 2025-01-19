using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace HealthBro_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        IWebHostEnvironment _env;
        public FileUploadController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [Route("BackEndServer")]
        [HttpPost]
        public IActionResult FileUploadBackEnd()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                string subFolder = "";
                var filePath = _env.ContentRootPath + subFolder + fileName;

                // Save file to local storage
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                // Return the relative path for the uploaded file
                return Ok(subFolder + fileName);
            }
            catch (Exception)
            {
                return Ok("default.jpg");
            }
        }
        
        [Route("FtpServer")]
        [HttpPost]

        public async Task<IActionResult> FileUploadFtp()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                string subFolder = "/users";

                var url = "ftp://ftp.nethely.hu" + subFolder + "/" + fileName;
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(url);
                request.Credentials = new NetworkCredential(Program.ftpUserName, Program.ftpPassword);
                request.Method = WebRequestMethods.Ftp.UploadFile;
                await using (Stream ftpStream = request.GetRequestStream())
                {
                    postedFile.CopyTo(ftpStream);
                }
                return Ok(fileName);

            }
            catch (Exception)
            {
                return Ok("default.jpg");
            }
        }



    }
}
