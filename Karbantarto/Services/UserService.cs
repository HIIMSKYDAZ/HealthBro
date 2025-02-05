using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Karbantarto.Models;

namespace Karbantarto.Services
{
    internal class UserService
    {
        public static async Task<List<User>?> GetAll(HttpClient httpClient)
        {
            try
            {
                // Token beállítása az Authorization fejlécben
                httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", Menu.loggedUser.token);

                // Felhasználók lekérése az API-ból
                return await httpClient.GetFromJsonAsync<List<User>>("https://localhost:5000/api/User/token");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba történt: {ex.Message}");
                return null;
            }
        }

        public static async Task<string> Post(HttpClient httpClient, User user)
        {
            try
            {
                string uj = JsonSerializer.Serialize(user, JsonSerializerOptions.Default);
                string url = $"{httpClient.BaseAddress}User/"+Menu.loggedUser.token;
                var request = new StringContent(uj, Encoding.UTF8, "application/json");
                var response = await httpClient.PostAsync(url, request);
                var content = await response.Content.ReadAsStringAsync();
                if (response.IsSuccessStatusCode)
                {
                    return content;
                }
                else
                {
                    return $"Hiba: {response.StatusCode}\n {response.Content.Headers}\n{content}";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public static async Task<string> Put(HttpClient httpClient, User user)
        {
            try
            {
                string url = $"{httpClient.BaseAddress}User/"+Menu.loggedUser.token;
                string uj = JsonSerializer.Serialize(user, JsonSerializerOptions.Default);
                var requestBody = new StringContent(uj, Encoding.UTF8, "application/json");
                var response = await httpClient.PutAsync(url, requestBody);
                var content = await response.Content.ReadAsStringAsync();
                if (response.IsSuccessStatusCode)
                {
                    return content;
                }
                else
                {
                    return $"Hiba: {response.StatusCode}\n {response.Content.Headers}\n{content}";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public static async Task<string> Delete(HttpClient httpClient, int id)
        {
            try
            {
                string uri = $"{httpClient.BaseAddress}User/"+Menu.loggedUser.token+","+id.ToString();
                var response = await httpClient.DeleteAsync(uri);
                var valasz = await response.Content.ReadAsStringAsync();
                return valasz;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
