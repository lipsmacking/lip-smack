using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestaurantPOC1.Models
{
    public class Inventory
    {       
        int inventoryId;
        string inventoryName;
        int roleId;

        public int InventoryId
        {
            get
            {
                return inventoryId;
            }

            set
            {
                inventoryId = value;
            }
        }

        public string InventoryName
        {
            get
            {
                return inventoryName;
            }

            set
            {
                inventoryName = value;
            }
        }

        public int RoleId
        {
            get
            {
                return roleId;
            }

            set
            {
                roleId = value;
            }
        }
    }
}