import Input from "../form/Input";
import Checker from "../form/Checker";

export const FormOne = ({ formData, changeValue }) => (
  <div className="group">
    <div className="title-bar">
      <h4>Lakás/ház méretei </h4>
      <p>
        <i class="fas fa-info-circle"></i> Adja meg a felújítandó lakás vagy ház alapvető méreteit
      </p>
    </div>
    <div className="input-group">
      <Input onChange={changeValue} type="number" name="size" value={formData.size} required>Alapterület (nm)</Input>
      <Input onChange={changeValue} type="number" name="rooms" value={formData.rooms} required>Szobák száma</Input>
      <div className="form-group-select">
        <select name="typeofwork" value={formData.typeofwork} onChange={changeValue}>
          <option value="channeling">Falon kívül</option>
          <option value="engraving">Falon belül</option>
        </select>
        <label>
          Kábelvezetés
        </label>
      </div>
    </div>
  </div>
)

export const FormTwo = ({formData, changeValue, numberOfRooms, modifyAssemblies}) => (
  <div className="group">
    <div className="title-bar">
      <h4>Szobák kiállásainak száma</h4>
      <p>
        <i class="fas fa-info-circle"></i> Adja meg hány fali kiállást szeretne. Beleszámítva a konnektorokat, koax és utp kiállásokat is. Például: Egy négy csatlakozós konnektor aljzat egy kiállás, mellette egy UTP-vel már két kiállás.
      </p>
    </div>
    <div className="input-group">
      <Input onChange={changeValue} type="number" name="hall" value={formData.hall} required>Előszoba</Input>
      <Input onChange={changeValue} type="number" name="livingroom" value={formData.livingroom} required>Nappapli</Input>
      <Input onChange={changeValue} type="number" name="kitchen" value={formData.kitchen} required>Konyha</Input>
      <Input onChange={changeValue} type="number" name="bathroom" value={formData.bathroom} required>Fürdőszoba</Input>
      {numberOfRooms.map((room, i) => {
        return (
          <Input onChange={modifyAssemblies} type="number" name={room.indexName} value={room.assembly} key={i} required>{room.name}</Input>
        )
      })}
    </div>
  </div>
)

export const FormThreeTest = ({ formData, changeValue }) => (
  <div className="group">
  <div className="title-bar">
    <h4>Elektromos készülékek</h4>
    <p>
      <i class="fas fa-info-circle"></i> Adja meg milyen elektromos készülékeket használatára szeretné felkészíteni a hálozatot.
    </p>
  </div>
  <div className="input-group">
    <Checker onChange={changeValue} type="checkbox" name="dishwasher" checked={formData.dishwasher}>Mosogatógép</Checker>
    <Checker onChange={changeValue} type="checkbox" name="electricoven" checked={formData.electricoven}>Elektromos sütő</Checker>
    <Checker onChange={changeValue} type="checkbox" name="washingmachine" checked={formData.washingmachine}>Mosógép</Checker>
    <Checker onChange={changeValue} type="checkbox" name="dryer" checked={formData.dryer}>Szárítógép</Checker>
  </div>
</div>
)

export const FormFourTest = ({ offers, formData, formatter, ownPriceFormatter, changeValue, accept }) => (
  <div className="group">
    <div className="title-bar">
      <h4>Előkalkuláció*</h4>
      <p>
        <i class="fas fa-info-circle"></i> Az árajánlat átnézése után adatai megadásával visszahívást kérhet, ahol leegyeztetheti az <strong>ingyenes</strong> kiszállási időpontot a felméréshez.
      </p>
    </div>
    <div className="prices">
      <div className="prices-group">
        <div className="name">Áramkörök kiépítése</div>
        <div className="price">{ownPriceFormatter(formatter.format(offers.circuitOffer))}</div>
      </div>
      <div className="prices-group">
        <div className="name">Kiállások kiépítése</div>
        <div className="price">{ownPriceFormatter(formatter.format(offers.assemblyOffer))}</div>
      </div>
      <div className="prices-group">
        <div className="name">Kábelvezetés kiépítése <span>{formData.typeofwork === 'channeling' ? 'falon kívül' : 'falon belül'}</span></div>
        <div className="price">{ownPriceFormatter(formatter.format(offers.typeOfWorkOffer))}</div>
      </div>
      <div className="prices-group text-bold">
        <div className="name">Összesen</div>
        <div className="price">{ownPriceFormatter(formatter.format(offers.circuitOffer + offers.assemblyOffer + offers.typeOfWorkOffer))}**</div>
      </div>
    </div>
    <div className="input-group">
      <Input onChange={changeValue} type="name" name="name" value={formData.name} required >Teljes név</Input>
      <Input onChange={changeValue} type="number" name="zipcode" value={formData.zipcode} required>Irányítószám</Input>
      <Input onChange={changeValue} type="text" name="email" value={formData.email} required>Email cím</Input>
      <Input onChange={changeValue} type="text" name="phone" value={formData.phone} placeholder="+36 30 123 4567" required>Telefonszám</Input>
      <Checker onChange={changeValue} type="checkbox" name="accept" checked={formData.accept}>Elolvastam és elfogadom az Adatkezelési nyilatkozatot</Checker>
    </div>
    <div className="details">
      <p><strong>*</strong> Az árak tájékoztató jellegűek, melyek nem minősülnek ajánlattételnek.</p>
      <p><strong>**</strong> Az árak tartalmazzák az ÁFA-t. Az árak nem tartalmazzák az anyagköltséget.</p>
    </div>
  </div>
)