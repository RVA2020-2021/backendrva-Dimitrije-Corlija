package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Racun;
import rva.jpa.StavkaRacuna;
import rva.repository.RacunRepository;
import rva.repository.StavkaRacunaRepository;

@RestController
public class StavkaRacunRestController {

	@Autowired
	private StavkaRacunaRepository stavkaRacunaRepository;
	
	@Autowired // ova anotacija omogucava injekciju zavisnosti
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private RacunRepository racunRepository;
	
	@GetMapping("stavkaRacuna")
	public Collection<StavkaRacuna> getStavkaRacuna(){
		return stavkaRacunaRepository.findAll();
	}
	
	@GetMapping("stavkaRacuna/{id}")
	public StavkaRacuna getStavkaRacuna(@PathVariable ("id") Integer id) {
		return  stavkaRacunaRepository.getOne(id);
	}
	
	@GetMapping("stavkeRacuna/{id}")
	public Collection<StavkaRacuna> getStavkePoRacunu(@PathVariable ("id") Integer id) {
		Racun r = racunRepository.getOne(id);
		return  stavkaRacunaRepository.findByRacun(r);
	}
	
}
