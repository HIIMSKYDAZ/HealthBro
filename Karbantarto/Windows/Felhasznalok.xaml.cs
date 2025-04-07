using System;
using System.Collections.Generic;
using System.Linq;
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
using Karbantarto.Services;
using Karbantarto.Models;
using Microsoft.Win32;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Karbantarto.Classes;
using System.Net.Http;

namespace Karbantarto.Windows
{
    public partial class Felhasznalok : Window
    {
        string SALT;
        string HASH;

        private static List<User> felhasznalok = new List<User>();
        public Felhasznalok()
        {
            InitializeComponent();
            AdatokBetoltese();
        }

        private void dtgAdatSelChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dtg_Users.SelectedItem != null)
            {
                txb_Id.Text = (dtg_Users.SelectedItem as User).Id.ToString();
                txb_FelhasznaloNev.Text = (dtg_Users.SelectedItem as User).LoginName;
                txb_TeljesNev.Text = (dtg_Users.SelectedItem as User).Name;
                txb_Email.Text = (dtg_Users.SelectedItem as User).Email;
                txb_Jogosultsag.Text = (dtg_Users.SelectedItem as User).PermissionId.ToString();
                txb_Aktiv.IsChecked = (dtg_Users.SelectedItem as User).Active;
                txb_PfrofilkepUtvonal.Text = (dtg_Users.SelectedItem as User).ProfilePicturePath;
                SALT = (dtg_Users.SelectedItem as User).Salt;
                HASH = (dtg_Users.SelectedItem as User).Hash;
            }
        }

        private async void UjFelhasznalo(object sender, RoutedEventArgs e)
        {
            SALT = Menu.GenerateSalt();
            User user = new User
            {
                Id = 0,
                LoginName = txb_FelhasznaloNev.Text,
                Name = txb_TeljesNev.Text,
                Salt = SALT,
                Hash = Menu.CreateSHA256(Menu.CreateSHA256(pwd_Jelszo.Password + SALT)),
                Email = txb_Email.Text,
                PermissionId = int.Parse(txb_Jogosultsag.Text),
                Active = txb_Aktiv.IsChecked ?? false,
                ProfilePicturePath = txb_PfrofilkepUtvonal.Text,
            };
            string valasz = await UserService.Post(Menu.sharedClient, user);
            Task.Delay(1000).Wait();
            MessageBox.Show(valasz);
            AdatokBetoltese();
            dtg_Users.SelectedIndex = 0;
        }

        private async void FelhasznaloModosit(object sender, RoutedEventArgs e)
        {
            if (pwd_Jelszo.Password != "")
            {
                SALT = Menu.GenerateSalt();
                HASH = Menu.CreateSHA256(Menu.CreateSHA256(pwd_Jelszo.Password + SALT));
            }

            var fullUpdate = new
            {
                Id = int.Parse(txb_Id.Text),
                LoginName = txb_FelhasznaloNev.Text,
                Name = txb_TeljesNev.Text,
                Email = txb_Email.Text,
                Hash = HASH,
                Salt = SALT,
                PermissionId = int.Parse(txb_Jogosultsag.Text),
                Active = txb_Aktiv.IsChecked ?? false,
                ProfilePicturePath = txb_PfrofilkepUtvonal.Text
            };

            var response = await Menu.sharedClient.PutAsJsonAsync($"https://healthbro-zkhz.onrender.com/api/User/UpdateFullUser/token", fullUpdate);
            string valasz = await response.Content.ReadAsStringAsync();
            Task.Delay(1000).Wait();
            MessageBox.Show(valasz);
            AdatokBetoltese();
            dtg_Users.SelectedIndex = 0;
        }

        private async void FelhasznaloTorol(object sender, RoutedEventArgs e)
        {

            if (MessageBox.Show($"Biztosan törlöd a(z) {txb_Id.Text} azonosítójú felhasználót?", "Törlés", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.Yes)
            {
                if (!int.TryParse(txb_Id.Text, out int userId))
                {
                    MessageBox.Show("Érvénytelen felhasználói azonosító!");
                    return;
                }
                try
                {
                    MessageBox.Show(txb_Id.Text);
                    MessageBox.Show(Menu.loggedUser.token);
                    var encodedToken = Uri.EscapeDataString(Menu.loggedUser.token);
                    var response = await Menu.sharedClient.DeleteAsync($"https://healthbro-zkhz.onrender.com/api/User/DeleteUser/{userId}/{encodedToken}");


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

                AdatokBetoltese();
                dtg_Users.SelectedIndex = 0;
            }
        }

        private async void AdatokBetoltese()
        {
            dtg_Users.ItemsSource = await UserService.GetAll(Menu.sharedClient);
        }

        private void FotoKivalasztas(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog
            {
                Title = "Válassz egy fájlt",
                Filter = "Képfájlok (*.jpg;*.png)|*.jpg;*.png",
                Multiselect = false
            };
            if (openFileDialog.ShowDialog() == true)
            {
                txb_PfrofilkepUtvonal.Text = FileUploadService.Ftp(Menu.sharedClient, openFileDialog.FileName);
            }
        }
    }
}
