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


import rva.jpa.Proizvod;
import rva.repository.ProizvodRepository;

@RestController
public class ProizvodRestController {

	@Autowired
	private ProizvodRepository proizvodRepository;
	
	@Autowired // ova anotacija omogucava injekciju zavisnosti
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("proizvod")
	public Collection<Proizvod> getProizvod() {
		return proizvodRepository.findAll();
	}
	
	@GetMapping("proizvod/{id}")
	public Proizvod getProizvod(@PathVariable ("id") Integer id) {
		return  proizvodRepository.getOne(id);
	}
	
	@GetMapping("proizvodNaziv/{naziv}")
	public Collection<Proizvod> getProizvodByNaziv(@PathVariable ("naziv") String naziv)
	{
		return proizvodRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("proizvod")
	public ResponseEntity<Proizvod> insertProizvod(@RequestBody Proizvod proizvod)
	{
		if(!proizvodRepository.existsById(proizvod.getId()))
		{
			proizvodRepository.save(proizvod);
			return new ResponseEntity<Proizvod>(HttpStatus.OK);
		} 
		return new ResponseEntity<Proizvod>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("proizvod")
	public ResponseEntity<Proizvod> updateProizvod(@RequestBody Proizvod proizvod)
	{
		if(!proizvodRepository.existsById(proizvod.getId()))
		{
			return new ResponseEntity<Proizvod>(HttpStatus.CONFLICT);
		}
		proizvodRepository.save(proizvod);
		return new ResponseEntity<Proizvod>(HttpStatus.OK);
	}
	@Transactional
	@DeleteMapping("proizvod/{id}")
	public ResponseEntity<Proizvod> deleteProizvod(@PathVariable Integer id)
	{
		if(!proizvodRepository.existsById(id))
		{
			return new ResponseEntity<Proizvod>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("DELETE FROM stavka_racuna WHERE proizvod="+id);
		proizvodRepository.deleteById(id);
		if(id == -100)
		{
			jdbcTemplate.execute("INSERT INTO \"proizvod\"(\"id\", \"naziv\", \"proizvodjac\") "
					+ "VALUES(-100,'Dimitrije','2')");
		}
		return new ResponseEntity<Proizvod>(HttpStatus.OK);
		
	}
}
