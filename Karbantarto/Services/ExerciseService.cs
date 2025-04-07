using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Karbantarto.Models;

namespace Karbantarto.Services
{
    internal class ExerciseService
    {
        public static async Task<List<Exercise>?> GetAll(HttpClient httpClient)
        {
            try
            {
                // Token beállítása az Authorization fejlécben
                httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", Menu.loggedUser.token);

                // Gyakorlatok lekérése az API-ból
                return await httpClient.GetFromJsonAsync<List<Exercise>>("https://healthbro-zkhz.onrender.com/api/Exercises");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba történt: {ex.Message}");
                return null;
            }
        }

        public static async Task<string> Post(HttpClient httpClient, Exercise exercise, string apiUrl = null)
        {
            try
            {
                // Use JsonSerializerOptions with camelCase to match API expectations
                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    WriteIndented = true
                };

                string json = JsonSerializer.Serialize(exercise, options);

                // Use provided API URL or construct from base address
                string url = !string.IsNullOrEmpty(apiUrl)
                    ? apiUrl
                    : $"{httpClient.BaseAddress}api/Exercises";

                Console.WriteLine($"Sending request to: {url}");
                Console.WriteLine($"Request content: {json}");

                var request = new StringContent(json, Encoding.UTF8, "application/json");

                // Make sure authorization header is set
                if (Menu.loggedUser?.token != null)
                {
                    httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", Menu.loggedUser.token);
                }

                var response = await httpClient.PostAsync(url, request);
                var responseContent = await response.Content.ReadAsStringAsync();

                Console.WriteLine($"Response status: {response.StatusCode}");
                Console.WriteLine($"Response content: {responseContent}");

                if (response.IsSuccessStatusCode)
                {
                    try
                    {
                        var createdExercise = await response.Content.ReadFromJsonAsync<Exercise>();
                        return $"Új gyakorlat sikeresen hozzáadva: {createdExercise?.Name ?? "ismeretlen"}";
                    }
                    catch
                    {
                        // In case deserialization fails
                        return $"Gyakorlat hozzáadva. Szerver válasza: {responseContent}";
                    }
                }
                else
                {
                    return $"Hiba történt: {response.StatusCode}, {responseContent}";
                }
            }
            catch (Exception ex)
            {
                return $"Hiba történt: {ex.Message}";
            }
        }


        public static async Task<string> Put(HttpClient httpClient, Exercise exercise)
        {
            try
            {
                string url = $"{httpClient.BaseAddress}api/Exercises/{exercise.exerciseId}";
                string uj = JsonSerializer.Serialize(exercise, JsonSerializerOptions.Default);
                var requestBody = new StringContent(uj, Encoding.UTF8, "application/json");
                var response = await httpClient.PutAsync(url, requestBody);
                var content = await response.Content.ReadAsStringAsync();
                if (response.IsSuccessStatusCode)
                {
                    return $"Sikeres módosítás";
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
                string uri = $"{httpClient.BaseAddress}api/Exercises/{id}";
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
