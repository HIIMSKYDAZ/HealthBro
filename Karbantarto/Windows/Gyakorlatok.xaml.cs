using Karbantarto.Models;
using Karbantarto.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Karbantarto.Windows
{
    /// <summary>
    /// Interaction logic for Gyakorlatok.xaml
    /// </summary>
    public partial class Gyakorlatok : Window
    {
        public Gyakorlatok()
        {
            InitializeComponent();
            AdatokBetoltese();
        }

        private void dtgAdatSelChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dtg_Edzesek.SelectedItem != null)
            {
                // Ellenőrizzük, hogy az elem Exercise típusú
                if (dtg_Edzesek.SelectedItem is Exercise selectedExercise)
                {
                    txb_Id.Text = selectedExercise.exerciseId.ToString();
                    txb_EdzesNev.Text = selectedExercise.Name;
                    txb_Izomcsoport.Text = selectedExercise.muscleGroup;
                    txb_Leiras.Text = selectedExercise.Description;
                }
            }
            else
            {
                // Ha nincs kiválasztva elem, akkor null értékeket állítunk
                txb_Id.Text = "";
                txb_EdzesNev.Text = "";
                txb_Izomcsoport.Text = "";
                txb_Leiras.Text = "";
            }
        }

        private async void AdatokBetoltese()
        {
            var exercises = await ExerciseService.GetAll(Menu.sharedClient);
            if (exercises != null)
            {
                dtg_Edzesek.ItemsSource = exercises;
            }
        }


        private async void UjEdzes(object sender, RoutedEventArgs e)
        {
            // Új gyakorlat létrehozása
            Exercise exercise = new Exercise
            {
                exerciseId = 0, // új gyakorlatnál id = 0
                Name = txb_EdzesNev.Text,
                muscleGroup = txb_Izomcsoport.Text,
                Description = txb_Leiras.Text
            };

            // Manually specify the API URL
            string apiUrl = "https://healthbro-zkhz.onrender.com/api/Exercises";

            // Gyakorlat hozzáadása az API-hoz
            string valasz = await ExerciseService.Post(Menu.sharedClient, exercise, apiUrl);

            MessageBox.Show(valasz);  // Megjeleníthető szöveges válasz

            // Adatok frissítése
            AdatokBetoltese();
            dtg_Edzesek.SelectedIndex = 0;
        }


        private async void EdzesModosit(object sender, RoutedEventArgs e)
        {
            // Gyakorlat módosítása
            var fullUpdate = new
            {
                exerciseId = int.Parse(txb_Id.Text),
                Name = txb_EdzesNev.Text,
                muscleGroup = txb_Izomcsoport.Text,
                Description = txb_Leiras.Text
            };
            try
            {
                var response = await Menu.sharedClient.PutAsJsonAsync($"https://healthbro-zkhz.onrender.com/api/Exercises/{txb_Id.Text}", fullUpdate);
                string valasz = await response.Content.ReadAsStringAsync();
                Task.Delay(1000).Wait();

                // Adatok frissítése
                AdatokBetoltese();
                dtg_Edzesek.SelectedIndex = 0;
                MessageBox.Show("Sikeres módosítás");
            }
            catch (Exception ex)
            {

                MessageBox.Show(ex.Message);
            }
            // Frissítés az API-ban

        }

        private async void EdzesTorol(object sender, RoutedEventArgs e)
        {
            // Törlés megerősítése
            if (MessageBox.Show($"Biztosan törlöd a(z) {txb_Id.Text} azonosítójú gyakorlatot?", "Törlés", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.Yes)
            {
                if (!int.TryParse(txb_Id.Text, out int exerciseId))
                {
                    MessageBox.Show("Érvénytelen gyakorlat azonosító!");
                    return;
                }

                try
                {
                    var response = await Menu.sharedClient.DeleteAsync($"https://healthbro-zkhz.onrender.com/api/Exercises/{txb_Id.Text}");

                    if (response.IsSuccessStatusCode)
                    {
                        string valasz = await response.Content.ReadAsStringAsync();
                        MessageBox.Show(string.IsNullOrWhiteSpace(valasz) ? "Sikeres törlés." : valasz);
                    }
                    else
                    {
                        MessageBox.Show($"Hiba történt: {response.StatusCode}");
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba a törlés során: {ex.Message}");
                }

                // Adatok frissítése
                AdatokBetoltese();
                dtg_Edzesek.SelectedIndex = 0;
            }
        }
    }
}
