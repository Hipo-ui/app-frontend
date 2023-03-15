import { useState } from "react";
import "./App.css";

function App() {
	const [searchSku, setSearchSku] = useState(0);
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({
		sku: 0,
		descontinuado: 0,
		articulo: "",
		marca: "",
		modelo: "",
		departamento: "",
		clase: "",
		familia: "",
		stock: 0,
		cantidad: 0,
		fechaAlta: "",
		fechaBaja: "",
	});

	const loadData = async () => {
		const getData = fetch(`http://localhost:8080/producto/lista`)
			.then((response) => response.json())
			.then((products) => products);

		const products = await getData;

		setProducts(products);
		console.log(products);
	};

	const getSku = async (searchSku) => {
		try {
			const getProduct = fetch(`http://localhost:8080/producto/${searchSku}`)
				.then((response) => response.json())
				.then((data) => data);

			const data = await getProduct;
			if (data) {
				setProduct({
					...product,
					sku: data.sku,
					descontinuado: data.descontinuado,
					articulo: data.articulo,
					marca: data.marca,
					modelo: data.modelo,
					departamento: data.departamento,
					clase: data.clase,
					familia: data.familia,
					stock: data.stock,
					cantidad: data.cantidad,
					fechaAlta: data.fechaAlta,
					fechaBaja: data.fechaBaja,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="max-w-md mx-auto my-14">
			<form action="" className="flex flex-col gap-4">
				<div>
					<label htmlFor="sku">SKU:</label>
					<input
						type="number"
						name="sku"
						id="sku"
						onChange={(e) => {
							setSearchSku(e.target.value);
							getSku(searchSku);
						}}
					/>
				</div>

				<div>
					<label htmlFor="descontinuado">Descontinuado</label>
					<input
						type="checkbox"
						name="descontinuado"
						id="descontinuado"
						checked={product.descontinuado}
						onChange={(e) => {
							setProduct({
								...product,
								descontinuado: e.target.checked,
							});
						}}
					/>
				</div>

				<div>
					<label htmlFor="articulo">Artículo:</label>
					<input
						type="text"
						name="articulo"
						id="articulo"
						value={product.articulo}
						onChange={(e) => {
							setProduct({
								...product,
								articulo: e.target.value,
							});
						}}
					/>
				</div>

				<div>
					<label htmlFor="marca">Marca:</label>
					<input
						type="text"
						name="marca"
						id="marca"
						value={product.marca}
						onChange={(e) => {
							setProduct({
								...product,
								marca: e.target.value,
							});
						}}
					/>
				</div>

				<div>
					<label htmlFor="modelo">Modelo:</label>
					<input
						type="text"
						name="modelo"
						id="modelo"
						value={product.modelo}
						onChange={(e) => {
							setProduct({
								...product,
								modelo: e.target.value,
							});
						}}
					/>
				</div>

				<div>
					<label htmlFor="departamento">Departamento:</label>
					<select
						name="departamento"
						id="departamento"
						onChange={(e) => {
							setProduct({
								...product,
								departamento: e.target.value,
							});
						}}
					>
						<option value="">Seleccionar</option>
						<option value="">Cocina</option>
					</select>
				</div>

				<div>
					<label htmlFor="clase">Clase:</label>
					<select
						name="clase"
						id="clase"
						onChange={(e) => {
							setProduct({
								...product,
								clase: e.target.value,
							});
						}}
					>
						<option value="">Seleccionar</option>
						<option value="">Licuadoras</option>
					</select>
				</div>

				<div>
					<label htmlFor="familia">Familia:</label>
					<select
						name="familia"
						id="familia"
						onChange={(e) => {
							setProduct({
								...product,
								familia: e.target.value,
							});
						}}
					>
						<option value="">Seleccionar</option>
						<option value="">Licuadoras</option>
					</select>
				</div>

				<div>
					<label htmlFor="stock">Stock:</label>
					<input
						type="number"
						name="stock"
						id="stock"
						value={product.stock}
						onChange={(e) => {
							setProduct({
								...product,
								stock: e.target.value,
							});
						}}
					/>
				</div>

				<div>
					<label htmlFor="cantidad">Cantidad:</label>
					<input
						type="number"
						name="cantidad"
						id="cantidad"
						value={product.cantidad}
						onChange={(e) => {
							setProduct({
								...product,
								cantidad: e.target.value,
							});
						}}
					/>
				</div>

				<div>
					<label htmlFor="fechaAlta">Fecha Alta:</label>
					<input
						type="date"
						name="fechaAlta"
						id="fechaAlta"
						value={product.fechaAlta}
						onChange={(e) => {
							setProduct({
								...product,
								fechaAlta: e.target.value,
							});
						}}
					/>
				</div>

				<div>
					<label htmlFor="fechaBaja">Fecha Baja:</label>
					<input
						type="date"
						name="fechaBaja"
						id="fechaBaja"
						value={product.fechaBaja}
						onChange={(e) => {
							setProduct({
								...product,
								fechaBaja: e.target.value,
							});
						}}
					/>
				</div>

				<button type="submit" className="button">
					Enivar
				</button>
			</form>

			<button onClick={loadData} className="button-alt mt-4">
				Cargar datos
			</button>

			{products.map((item) => {
				return (
					<ul
						key={item.sku}
						className="mt-4 list-disc list-inside bg-zinc-100 p-4 rounded-md text-gray-800"
					>
						<li>SKU: {item.sku}</li>
						<li>Artículo: {item.articulo}</li>
						<li>Marca: {item.marca}</li>
						<li>Modelo: {item.modelo}</li>
					</ul>
				);
			})}
		</div>
	);
}

export default App;
