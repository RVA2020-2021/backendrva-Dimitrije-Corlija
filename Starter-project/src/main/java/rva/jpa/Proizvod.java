package rva.jpa;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


/**
 * The persistent class for the proizvod database table.
 * 
 */
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Entity/* kaze da je to jedan torka u okviru nase baze podataka*/
@NamedQuery(name="Proizvod.findAll", query="SELECT p FROM Proizvod p")/* na osnovu ovoga mozemo izvuci podatke iz nasih tabela*/
public class Proizvod implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="PROIZVOD_ID_GENERATOR", sequenceName="PROIZVOD_SEQ", allocationSize = 1)/*sekvenca je mehanizam koji omogucava da se id automatski inkrementira*/
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PROIZVOD_ID_GENERATOR")
	private Integer id;

	private String naziv;

	//bi-directional many-to-one association to Proizvodjac
	@ManyToOne /* od jednog je proizvodjaca*/
	@JoinColumn(name="proizvodjac")
	private Proizvodjac proizvodjac;

	@JsonIgnore
	//bi-directional many-to-one association to StavkaRacuna
	@OneToMany(mappedBy="proizvod") /* jedan proizvod se odnosi na vise stavki racuna*/
	private List<StavkaRacuna> stavkaRacunas;

	public Proizvod() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNaziv() {
		return this.naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public Proizvodjac getProizvodjac() {
		return this.proizvodjac;
	}

	public void setProizvodjac(Proizvodjac proizvodjac) {
		this.proizvodjac = proizvodjac;
	}

	public List<StavkaRacuna> getStavkaRacunas() {
		return this.stavkaRacunas;
	}

	public void setStavkaRacunas(List<StavkaRacuna> stavkaRacunas) {
		this.stavkaRacunas = stavkaRacunas;
	}

	public StavkaRacuna addStavkaRacuna(StavkaRacuna stavkaRacuna) {
		getStavkaRacunas().add(stavkaRacuna);
		stavkaRacuna.setProizvod(this);

		return stavkaRacuna;
	}

	public StavkaRacuna removeStavkaRacuna(StavkaRacuna stavkaRacuna) {
		getStavkaRacunas().remove(stavkaRacuna);
		stavkaRacuna.setProizvod(null);

		return stavkaRacuna;
	}

}