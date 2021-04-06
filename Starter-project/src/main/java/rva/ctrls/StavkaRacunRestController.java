package rva.ctrls;

import java.math.BigDecimal;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	@GetMapping("stavkaRacunaCena/{cena}")
	public Collection<StavkaRacuna> getStavkaRacunaCena(@PathVariable ("cena") BigDecimal cena) {
		return  stavkaRacunaRepository.findByCenaLessThanOrderById(cena);
	}
	
	
	@PostMapping("stavkaRacuna")
	public ResponseEntity<StavkaRacuna> insertStavkaRacuna(@RequestBody StavkaRacuna stavkaRacuna)
	{
		if(!stavkaRacunaRepository.existsById(stavkaRacuna.getId()))
		{
			stavkaRacuna.setRedniBroj(stavkaRacunaRepository.nextRbr(stavkaRacuna.getRacun().getId()));
			stavkaRacunaRepository.save(stavkaRacuna);
			return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
		}
		return new ResponseEntity<StavkaRacuna>(HttpStatus.CONFLICT);
	}
	@PutMapping("stavkaRacuna")
	public ResponseEntity<StavkaRacuna> UpdateStavkaRacuna(@RequestBody StavkaRacuna stavkaRacuna)
	{
		if(!stavkaRacunaRepository.existsById(stavkaRacuna.getId()))
		{
			return new ResponseEntity<StavkaRacuna>(HttpStatus.NO_CONTENT);
		}
		stavkaRacunaRepository.save(stavkaRacuna);
		return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
	}
	
	@DeleteMapping("stavkaRacuna/{id}")
	public ResponseEntity<StavkaRacuna> deleteStavkaRacuna(@PathVariable("id") Integer id)
	{
		if(!stavkaRacunaRepository.existsById(id))
		{
			return new ResponseEntity<StavkaRacuna>(HttpStatus.NO_CONTENT);
		}
		
		stavkaRacunaRepository.deleteById(id);
		if(id==-100)
		{
			jdbcTemplate.execute("INSERT INTO \"StavkaRacuna\"(\"id\", \"redni_broj\", \"kolicina\",\"jedinica_mere\",\"cena\",\"racuna\",\"proizvod\") "
					+ "VALUES(-100,100,1,'kom',1,1,1)");
		}
		return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
	}
}
