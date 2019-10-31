using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataLibrary.DataAccess;

namespace BH_CRUDJet.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ViewJets()
        {
            return View();
        }

        public JsonResult submitJet(DataLibrary.Models.Jet jet)
        {
            var newJet = SqlProcessor.CreateJet(jet.modelName, jet.serialNumber);
            return Json(newJet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult JetList()
        {
           var result = SqlProcessor.JetList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateJet(DataLibrary.Models.Jet jet)
        {
            
            var result = SqlProcessor.updateJet(jet);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult deleteJet(DataLibrary.Models.Jet jet)
        {
            SqlProcessor.deleteJet(jet);
            return Json(jet, JsonRequestBehavior.AllowGet);
        }



    }
}
