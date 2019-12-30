using System.Dynamic;
using System.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Common;
using System.Threading.Tasks;
using AppSystem.Models;
using AppSystem.persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppSystem.Controllers
{
    [Route("/api/cities")]
    public class CitiesController : Controller
    {
        private readonly MyDbContext context;
        public CitiesController(MyDbContext context)
        {
            this.context = context;
        }
        // Add New data
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] City city){
            var dupresname = context.countries.Any(c => c.Name == city.Name);
           // Console.WriteLine(duprescode);
            if(!dupresname){
                context.cities.Add(city);
                int res = 0;
                if(await context.SaveChangesAsync()>0){
                    res = 1;
                }
                else{
                    res = 0;
                }
                dynamic result = new ExpandoObject();
                result.status = res;
                result.msg = "";
                return Ok(result);
            }
            else{
                string type = "";
                if(dupresname){
                    type = "Name";
                }
                string masg = "Country with this "+type+" already Exists.";
                dynamic result = new ExpandoObject();
                result.status = -1;
                result.msg = masg;
                //Console.WriteLine(res);
                return Ok(result);
            }            
        }

        public static bool check(string s)
        {
            return (s == null || s == String.Empty) ? true : false;
        }
        // Update All data
        [HttpGet]
        public async Task<dynamic> GetCities(string search, string sort, string order, int? page, int? pagelength)
        {
            string limit = "";
            //Set limit
            if (pagelength > 0)
            {
                limit = "OFFSET " + (page * pagelength) + " ROWS FETCH NEXT " + pagelength + " ROWS ONLY";
            }
            else
            {
                limit = "OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY";
            }
            //search sort
            if (check(sort) == false)
            {
                sort = "Order By " + sort + " " + order + "";
            }
            else
            {
                sort = "Order By Name asc";
            }
            //search Check
            if (check(search) == false)
            {
                search = "where Name Like '%" + search + "%' OR countries.Name Like '%" + search + "%'";
            }
            else
            {
                search = "";
            }

            var conn = context.Database.GetDbConnection();
            // Console.WriteLine("select * from cities Join countries on cities.id = countries.id " + search + " " + sort + " " + limit);
            var dbdata =await context.countries.FromSqlRaw("select cities.id, cities.Name as Name, countries.Name as country, CountryCode from cities Join countries on cities.id = countries.id " + search + " " + sort + " " + limit).ToListAsync();
            var countries_count =await context.countries.FromSqlRaw("select cities.id, cities.Name as Name, countries.Name as country, CountryCode from cities Join countries on cities.id = countries.id " + search).ToListAsync();
            
            // Console.Write(dbdata);
            dynamic result = new ExpandoObject();
            result.items = dbdata;
            result.total_count = countries_count.Count();

            return  result;
        }
        // Update data
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCountries(int id){
            var dupresname = await context.countries.Where(c => c.id == id).SingleAsync();
            return Ok(dupresname);
        }
        // Update data
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Country country){
            country.CountryCode = "+"+country.CountryCode;
            var dupresname = context.countries.Any(c => c.Name == country.Name && c.id != country.id);
            var duprescode = context.countries.Any(c => c.CountryCode == country.CountryCode && c.id != country.id);
           // Console.WriteLine(duprescode);
            if(!dupresname&&!duprescode){
                context.countries.Update(country);
                int res = 0;
                if(await context.SaveChangesAsync()>0){
                    res = 1;
                }
                else{
                    res = 0;
                }
                dynamic result = new ExpandoObject();
                result.status = res;
                result.msg = "";
                return Ok(result);
            }
            else{
                string type = "";
                if(duprescode){
                    type = "Country Code";
                }
                if(duprescode&&duprescode){
                    type = "Name and Country Code";
                }
                string masg = "Country with this "+type+" already Exists.";
                dynamic result = new ExpandoObject();
                result.status = -1;
                result.msg = masg;
                //Console.WriteLine(res);
                return Ok(result);
            }  
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id){
            var isdataexist = context.countries.Any(c => c.id == id);
            if(isdataexist){
                int res = 0;
                var country = await context.countries.FindAsync(id);
                context.Remove(country);
                if(await context.SaveChangesAsync()>0){
                    res = 1;
                }
                else{
                    res = 0;
                }
                dynamic result = new ExpandoObject();
                result.status = res;
                result.msg = "Country removed successfully.";
                return Ok(result);
            }
            else{
                string masg = "Country Does Not Exists or already deleted.";
                dynamic result = new ExpandoObject();
                result.status = -1;
                result.msg = masg;
                //Console.WriteLine(res);
                return Ok(result);
            }
            
        }
    }
}