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

namespace Karbantarto.Windows
{
    /// <summary>
    /// Interaction logic for Felhasznalok.xaml
    /// </summary>
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
                txb_FelhasznaloNev.Text = (dtg_Users.SelectedItem as User).loginName;
                txb_TeljesNev.Text = (dtg_Users.SelectedItem as User).name;
                txb_Email.Text = (dtg_Users.SelectedItem as User).Email;
                txb_Jogosultsag.Text = (dtg_Users.SelectedItem as User).Jogosultsag.ToString();
                txb_Aktiv.Text = (dtg_Users.SelectedItem as User).Aktiv.ToString();
                txb_PfrofilkepUtvonal.Text = (dtg_Users.SelectedItem as User).profilPicturePath;
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
                loginName = txb_FelhasznaloNev.Text,
                name = txb_TeljesNev.Text,
                Salt = SALT,
                Hash = Menu.CreateSHA256(Menu.CreateSHA256(pwd_Jelszo.Password+SALT)),
                Email = txb_Email.Text,
                Jogosultsag = int.Parse(txb_Jogosultsag.Text),
                Aktiv = int.Parse(txb_Aktiv.Text),
                profilPicturePath=txb_PfrofilkepUtvonal.Text,
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
            User user = new User
            {
                Id = int.Parse(txb_Id.Text),
                loginName = txb_FelhasznaloNev.Text,
                name = txb_TeljesNev.Text,
                Salt = SALT,
                Hash = HASH,
                Email = txb_Email.Text,
                Jogosultsag = int.Parse(txb_Jogosultsag.Text),
                Aktiv = int.Parse(txb_Aktiv.Text),
                profilPicturePath = txb_PfrofilkepUtvonal.Text,
            };
            string valasz = await UserService.Put(Menu.sharedClient, user);
            Task.Delay(1000).Wait();
            MessageBox.Show(valasz);
            AdatokBetoltese();
            dtg_Users.SelectedIndex = 0;
        }

        private async void FelhasznaloTorol(object sender, RoutedEventArgs e)
        {
            if (MessageBox.Show($"Biztosan törlöd {txb_Id.Text} azonosítójú felhasználót?", "Törlés", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.Yes)
            {
                string valasz = await UserService.Delete(Menu.sharedClient, int.Parse(txb_Id.Text));
                Task.Delay(1000).Wait();
                MessageBox.Show(valasz);
            }
            AdatokBetoltese(); ;
            dtg_Users.SelectedIndex = 0;
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
