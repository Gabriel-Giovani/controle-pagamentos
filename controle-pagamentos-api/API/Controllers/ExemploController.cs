using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ExemploController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { mensagem = "API funcionando no Linux!" });
    }
}