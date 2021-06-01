package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Proizvod;
/*line 5 <> na koju se klasu odnosi*/
public interface ProizvodRepository extends JpaRepository<Proizvod,Integer> {

	/* koristimo ako zelimo da pretrazujemo preko naziva*/
	Collection<Proizvod> findByNazivContainingIgnoreCase(String naziv);	
	
}
