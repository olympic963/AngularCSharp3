using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private static List<Employee> employees = new List<Employee>
{
    new Employee { Id = 1, Name = "Nguyễn Văn A", Position = "Lập trình viên", Salary = 80000 },
    new Employee { Id = 2, Name = "Trần Thị B", Position = "Quản lý", Salary = 95000 },
    new Employee { Id = 3, Name = "Lê Quang C", Position = "Lập trình viên", Salary = 75000 },
    new Employee { Id = 4, Name = "Phạm Thị D", Position = "Lập trình viên", Salary = 82000 },
    new Employee { Id = 5, Name = "Nguyễn Thị E", Position = "Thiết kế", Salary = 67000 },
    new Employee { Id = 6, Name = "Bùi Quang F", Position = "Quản lý", Salary = 105000 },
    new Employee { Id = 7, Name = "Đỗ Thị G", Position = "Nhân sự", Salary = 60000 },
    new Employee { Id = 8, Name = "Hoàng Quang H", Position = "Lập trình viên", Salary = 95000 },
    new Employee { Id = 9, Name = "Vũ Minh I", Position = "Kiểm thử", Salary = 54000 },
    new Employee { Id = 10, Name = "Lý Quang J", Position = "Quản lý", Salary = 90000 },
    new Employee { Id = 11, Name = "Ngô Thị K", Position = "Lập trình viên", Salary = 88000 },
    new Employee { Id = 12, Name = "Cao Minh L", Position = "Hỗ trợ", Salary = 52000 },
    new Employee { Id = 13, Name = "Tạ Thị M", Position = "Thiết kế", Salary = 72000 },
    new Employee { Id = 14, Name = "Phan Minh N", Position = "Quản trị viên", Salary = 65000 },
    new Employee { Id = 15, Name = "Hoàng Thị O", Position = "Quản lý", Salary = 110000 },
    new Employee { Id = 16, Name = "Mai Minh P", Position = "Nhân sự", Salary = 59000 },
    new Employee { Id = 17, Name = "Nguyễn Thị Q", Position = "Lập trình viên", Salary = 78000 },
    new Employee { Id = 18, Name = "Phan Thị R", Position = "Bán hàng", Salary = 53000 },
    new Employee { Id = 19, Name = "Trần Minh S", Position = "Lập trình viên", Salary = 76000 },
    new Employee { Id = 20, Name = "Lê Thị T", Position = "Kiểm thử", Salary = 55000 }
};



        [HttpGet]
        public ActionResult<IEnumerable<Employee>> GetEmployees()
        {
            return Ok(employees);
        }

        [HttpPost]
        public ActionResult AddEmployee(Employee employee)
        {
            if (employees.Any())
            {
                employee.Id = employees.Max(e => e.Id) + 1;
            }
            else
            {
                employee.Id = 1;
            }
            employees.Add(employee);
            return Ok(employee);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateEmployee(int id, Employee updatedEmployee)
        {
            var employee = employees.FirstOrDefault(e => e.Id == id);
            if (employee == null) return NotFound();

            employee.Name = updatedEmployee.Name;
            employee.Position = updatedEmployee.Position;
            employee.Salary = updatedEmployee.Salary;

            return Ok(employee);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteEmployee(int id)
        {
            var employee = employees.FirstOrDefault(e => e.Id == id);
            if (employee == null) return NotFound();
            employees.Remove(employee);
            return Ok(new { message = $"Đã xóa nhân viên với ID: {id} thành công" });
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<Employee>> SearchEmployees(
            [FromQuery] string? name,
            [FromQuery] string? position,
            [FromQuery] string? sortBySalary)
        {
            var result = employees.AsEnumerable();
            if (!string.IsNullOrEmpty(name))
            {
                result = result.Where(e => e.Name.Contains(name, StringComparison.OrdinalIgnoreCase));
            }
            if (!string.IsNullOrEmpty(position))
            {
                result = result.Where(e => e.Position.Contains(position, StringComparison.OrdinalIgnoreCase));
            }
            if (!string.IsNullOrEmpty(sortBySalary))
            {
                if (sortBySalary.Equals("asc", StringComparison.OrdinalIgnoreCase))
                {
                    result = result.OrderBy(e => e.Salary);
                }
                else if (sortBySalary.Equals("desc", StringComparison.OrdinalIgnoreCase))
                {
                    result = result.OrderByDescending(e => e.Salary);
                }
            }
            return Ok(result);
        }

    }
}
