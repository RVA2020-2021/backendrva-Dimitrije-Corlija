package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

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

import io.swagger.annotations.ApiOperation;
import rva.jpa.Racun;
import rva.repository.RacunRepository;

@RestController
public class RacunRestController {

	@Autowired
	private RacunRepository racunRepository;
	
	@Autowired // ova anotacija omogucava injekciju zavisnosti
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("racun")
	@ApiOperation(value="Vraca kolekciju svih racuna iz baze podataka")
	public Collection<Racun> getRacun(){
		return racunRepository.findAll();
	}
	
	@GetMapping("racun/{id}")
	@ApiOperation(value="Vraca racun na osnovu prosledjenog ID-ija")
	public Racun getRacun(@PathVariable ("id") Integer id) {
		return  racunRepository.getOne(id);
	}
	
	@GetMapping("racunNaziv/{naziv}")
	@ApiOperation(value="Vraca kolekciju racuna na osnovu pronadjenog naziva racuna")
	public Collection<Racun> getRacunByNaziv(@PathVariable ("naziv") String naziv)
	{
		return racunRepository.findByNacinPlacanja(naziv);
	}
	
	@PostMapping("racun")
	@ApiOperation(value="Dodaje novi racun u bazu podataka")
	public ResponseEntity<Racun> insertRacun(@RequestBody Racun racun)
	{
		if(!racunRepository.existsById(racun.getId()))
		{
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK);
		}
		return new ResponseEntity<Racun>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("racun")
	@ApiOperation(value="Update-uje racun iz baze podataka")
	public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun)
	{
		if(!racunRepository.existsById(racun.getId()))
		{
			return new ResponseEntity<Racun>(HttpStatus.CONFLICT);
		}
		racunRepository.save(racun);
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	@Transactional
	@DeleteMapping("racun/{id}")
	@ApiOperation(value="Brise racun iz baze podatak")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id)
	{
		if(!racunRepository.existsById(id))
		{
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("DELETE FROM stavka_racuna WHERE racun="+id);
			racunRepository.deleteById(id);
		if(id==-100)
		{
			jdbcTemplate.execute("INSERT INTO \"racun\"(\"id\", \"datum\", \"nacin_placanja\") "
					+ "VALUES(-100,to_date('05.03.2020.', 'dd.mm.yyyy.'),'kes')");
		}
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	
}
