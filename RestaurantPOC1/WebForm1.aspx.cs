using MySql.Data.MySqlClient;
using RestaurantPOC1.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Odbc;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RestaurantPOC1
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        List<Menu> menuItems = new List<Menu>();
        LipSmackingEntities db = new LipSmackingEntities();
        Menu selectedMenuItem = new Menu();
        
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                GetMenu();
                txtNewName.Text = string.Empty;
            }
                   
           
        }

        private void GetMenu()
        {                      
            try
            {
                //string strCommand = "SELECT inventory_name FROM inventory";
                //MySql.Data.MySqlClient.MySqlConnection mySqlConnection = new MySql.Data.MySqlClient.MySqlConnection();
                //Inventory inventoryItem = new Inventory();
                //mySqlConnection.ConnectionString = "Server= localhost;Database=se_project;Uid=root;Pwd=SEProject2;";
                //mySqlConnection.Open();
                //using (MySqlCommand command = new MySqlCommand(strCommand, mySqlConnection))
                //using (MySqlDataReader dr = command.ExecuteReader())
                //{
                //    //need to add DataAdapter
                //    //working on it
                //    menuItems.Add(inventoryItem);
                //    dr.Close();
                //}
                //mySqlConnection.Close();

                
                menuItems = (from r in db.Menus select r).ToList<Menu>();                
                menuddl.DataSource = menuItems;
                menuddl.DataTextField = "ItemName";           
                menuddl.DataBind();
            }
            catch (Exception ex)
            {
                Response.Write("An error occured: " + ex.Message);
            }
        }
               
        protected void Button1_Click(object sender, EventArgs e)
        {            
            PostData();
            GetMenu();
            txtNewName.Text = string.Empty;
        }

       
        private void PostData()
        {
            var menu = db.Menus.Find(menuddl.SelectedIndex + 1);
            menu.ItemName = txtNewName.Text;
            
            // Check whether there were any validation errors

            if (ModelState.IsValid)
            {
                db.SaveChanges();
            }

            //    string strCommand = "UPDATE inventory SET inventory_name = " + TextBox1.Text + "where inventory_id = "+ menuddl.SelectedIndex.ToString()+";";
            //    try
            //    {
            //        MySql.Data.MySqlClient.MySqlConnection mySqlConnection = new MySql.Data.MySqlClient.MySqlConnection();

            //        mySqlConnection.ConnectionString = "Server= localhost;Database=se_project;Uid=root;Pwd=SEProject2;";
            //        mySqlConnection.Open();
            //        using (MySqlCommand command = new MySqlCommand(strCommand, mySqlConnection))
            //        {
            //            command.ExecuteNonQuery();
            //            mySqlConnection.Close();
            //            Response.Write("Success!");
            //        }
            //    }
            //    catch (Exception ex)
            //    {
            //        Response.Write("An error occured: " + ex.Message);
            //    }
            //    menuddl.DataSource = menuItems;
            //    menuddl.DataBind();

        }

        protected void menuddl_SelectedIndexChanged(object sender, EventArgs e)
        {
            
        }
    }
}