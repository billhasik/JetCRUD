using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataLibrary.Models;

namespace DataLibrary.DataAccess
{
    public class SqlProcessor
    {
        public static List<Jet> CreateJet(string modelName, int serialNumber)
        {
            Jet jet = new Jet
            {
                modelName = modelName,
                serialNumber = serialNumber
            };
            string sql = @"insert into dbo.Jets (ModelName, SerialNumber)    
                             values(@modelName, @serialNumber);";

            SqlAccess.SaveData(sql, jet);
            string returnSql = @"select * from dbo.Jets where SerialNumber = "+serialNumber+";";
            
            return SqlAccess.LoadData<Jet>(returnSql);

           
        }

        public static List<Jet> JetList()
        {
            string sql = @"select *
                              from dbo.Jets;";

            return SqlAccess.LoadData<Jet>(sql);
        }

        public static Jet updateJet(Jet jet)
        {
            string sql = @"update dbo.Jets
                            set SerialNumber = @serialNumber,
                                ModelName = @modelName
                                where Id = @id;";
            SqlAccess.SaveData(sql, jet);
            return jet;
        }

        public static void deleteJet(Jet jet)
        {
            string sql = @"delete from dbo.Jets where Id = @id;";
            SqlAccess.DeleteData(sql, jet);
        }
    }
}
