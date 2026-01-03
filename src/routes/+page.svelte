<script lang="ts">
	interface Property {
		id: number;
		title: string;
		address: string;
		price: number;
		type: string;
		bedrooms: number;
		bathrooms: number;
		area: number;
		image: string;
		status: 'Novo' | 'Prodato';
	}

	// Mock podaci sa 6 nekretnina
	const properties: Property[] = [
		{
			id: 1,
			title: 'Luksuzna Vila sa Bazenom',
			address: 'Dedinje, Beograd',
			price: 1250000,
			type: 'Vila',
			bedrooms: 5,
			bathrooms: 4,
			area: 450,
			image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
			status: 'Novo'
		},
		{
			id: 2,
			title: 'Moderan Penthouse',
			address: 'Novi Beograd, Beograd',
			price: 850000,
			type: 'Stan',
			bedrooms: 4,
			bathrooms: 3,
			area: 180,
			image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
			status: 'Novo'
		},
		{
			id: 3,
			title: 'Ekskluzivna Porodična Kuća',
			address: 'Banovo Brdo, Beograd',
			price: 650000,
			type: 'Kuća',
			bedrooms: 4,
			bathrooms: 3,
			area: 320,
			image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
			status: 'Prodato'
		},
		{
			id: 4,
			title: 'Luksuzni Duplex Stan',
			address: 'Vračar, Beograd',
			price: 720000,
			type: 'Stan',
			bedrooms: 3,
			bathrooms: 2,
			area: 150,
			image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
			status: 'Novo'
		},
		{
			id: 5,
			title: 'Vikendica na Fruškoj Gori',
			address: 'Fruška Gora, Novi Sad',
			price: 380000,
			type: 'Vikendica',
			bedrooms: 3,
			bathrooms: 2,
			area: 200,
			image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
			status: 'Novo'
		},
		{
			id: 6,
			title: 'Elegantna Porodična Vila',
			address: 'Zemun, Beograd',
			price: 950000,
			type: 'Vila',
			bedrooms: 6,
			bathrooms: 5,
			area: 520,
			image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
			status: 'Prodato'
		}
	];

	let searchLocation = $state('');
	let propertyType = $state('Sve');
	let minPrice = $state('');
	let maxPrice = $state('');

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('sr-RS', {
			style: 'currency',
			currency: 'EUR',
			maximumFractionDigits: 0
		}).format(price);
	}

	function filteredProperties(): Property[] {
		return properties.filter((property) => {
			const matchesLocation =
				searchLocation === '' ||
				property.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
				property.title.toLowerCase().includes(searchLocation.toLowerCase());
			const matchesType = propertyType === 'Sve' || property.type === propertyType;
			const matchesMinPrice = minPrice === '' || property.price >= Number(minPrice);
			const matchesMaxPrice = maxPrice === '' || property.price <= Number(maxPrice);

			return matchesLocation && matchesType && matchesMinPrice && matchesMaxPrice;
		});
	}
</script>

<div class="min-h-screen bg-base-200">
	<!-- Sticky Navigacija -->
	<nav class="sticky top-0 z-50 bg-base-200/95 backdrop-blur-md shadow-lg border-b border-base-300">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-20">
				<div class="flex items-center space-x-2">
					<div class="text-3xl">🏛️</div>
					<h1 class="text-2xl font-bold text-primary">Luksuzne Nekretnine</h1>
				</div>
				<button class="btn btn-primary btn-lg shadow-lg">
					<span class="hidden sm:inline">Postavi Oglas</span>
					<span class="sm:hidden">+ Oglas</span>
				</button>
			</div>
		</div>
	</nav>

	<!-- Hero Sekcija sa Pretraživačem -->
	<section class="relative bg-gradient-to-br from-base-300 via-base-200 to-base-300 py-20 lg:py-32">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12 space-y-6">
				<h2 class="text-5xl lg:text-6xl font-bold text-base-content leading-tight">
					Pronađite Svoj
					<span class="text-primary">Savršen Dom</span>
				</h2>
				<p class="text-xl text-base-content/70 max-w-2xl mx-auto">
					Istražite našu kolekciju ekskluzivnih nekretnina i pronađite nekretninu koja odgovara vašem životnom stilu
				</p>
			</div>

			<!-- Veliki Pretraživač -->
			<div class="max-w-5xl mx-auto">
				<div class="bg-base-200 rounded-2xl shadow-2xl p-6 lg:p-8 border border-base-300">
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
						<div class="lg:col-span-2">
							<label class="label">
								<span class="label-text font-semibold">Lokacija</span>
							</label>
							<input
								type="text"
								bind:value={searchLocation}
								placeholder="Unesite grad, opštinu ili adresu"
								class="input input-bordered w-full focus:input-primary"
							/>
						</div>

						<div>
							<label class="label">
								<span class="label-text font-semibold">Tip Nekretnine</span>
							</label>
							<select bind:value={propertyType} class="select select-bordered w-full focus:select-primary">
								<option>Sve</option>
								<option>Vila</option>
								<option>Stan</option>
								<option>Kuća</option>
								<option>Vikendica</option>
							</select>
						</div>

						<div>
							<label class="label">
								<span class="label-text font-semibold">Cena od</span>
							</label>
							<input
								type="number"
								bind:value={minPrice}
								placeholder="Minimalna cena"
								class="input input-bordered w-full focus:input-primary"
							/>
						</div>

						<div>
							<label class="label">
								<span class="label-text font-semibold">Cena do</span>
							</label>
							<input
								type="number"
								bind:value={maxPrice}
								placeholder="Maksimalna cena"
								class="input input-bordered w-full focus:input-primary"
							/>
						</div>
					</div>

					<div class="mt-6 flex justify-center">
						<button class="btn btn-primary btn-lg px-12 shadow-lg hover:shadow-xl transition-shadow">
							Pretraži Nekretnine
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Property Cards Grid -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
		<div class="mb-12 text-center">
			<h3 class="text-4xl font-bold text-base-content mb-4">
				Istražite Našu <span class="text-primary">Kolekciju</span>
			</h3>
			<p class="text-lg text-base-content/70">
				Pronađeno {filteredProperties().length} nekretnina
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each filteredProperties() as property (property.id)}
				<div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
					<figure class="relative h-64 overflow-hidden">
						<img
							src={property.image}
							alt={property.title}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
						/>
						<div class="absolute top-4 right-4">
							{#if property.status === 'Novo'}
								<div class="badge badge-primary badge-lg shadow-lg">Novo</div>
							{:else}
								<div class="badge badge-error badge-lg shadow-lg">Prodato</div>
							{/if}
						</div>
					</figure>
					<div class="card-body p-6">
						<h4 class="card-title text-xl mb-2">{property.title}</h4>
						<p class="text-base-content/70 mb-4 flex items-center gap-2">
							📍 {property.address}
						</p>
						<div class="flex items-center gap-6 mb-4 text-sm text-base-content/60">
							<span class="flex items-center gap-1">
								🛏️ {property.bedrooms} soba
							</span>
							<span class="flex items-center gap-1">
								🚿 {property.bathrooms} kupatila
							</span>
							<span class="flex items-center gap-1">
								📐 {property.area} m²
							</span>
						</div>
						<div class="card-actions justify-between items-center pt-4 border-t border-base-300">
							<div>
								<p class="text-2xl font-bold text-primary">{formatPrice(property.price)}</p>
								<p class="text-xs text-base-content/50">{property.type}</p>
							</div>
							<button class="btn btn-primary btn-sm">Detalji</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		{#if filteredProperties().length === 0}
			<div class="text-center py-16">
				<div class="text-6xl mb-4">🔍</div>
				<h4 class="text-2xl font-semibold text-base-content mb-2">Nema rezultata</h4>
				<p class="text-base-content/70">Pokušajte da promenite kriterijume pretrage</p>
			</div>
		{/if}
	</section>

	<!-- Footer -->
	<footer class="bg-base-300 border-t border-base-400 mt-24">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
				<div>
					<h5 class="text-xl font-bold text-primary mb-4">Luksuzne Nekretnine</h5>
					<p class="text-base-content/70 text-sm">
						Vaš pouzdan partner u pronalaženju savršene nekretnine. Ekskluzivne ponude i profesionalna usluga.
					</p>
				</div>
				<div>
					<h6 class="font-semibold mb-4">Kupovina</h6>
					<ul class="space-y-2 text-sm text-base-content/70">
						<li><a href="#" class="hover:text-primary">Kuće</a></li>
						<li><a href="#" class="hover:text-primary">Stanovi</a></li>
						<li><a href="#" class="hover:text-primary">Vile</a></li>
						<li><a href="#" class="hover:text-primary">Zemljišta</a></li>
					</ul>
				</div>
				<div>
					<h6 class="font-semibold mb-4">Iznajmljivanje</h6>
					<ul class="space-y-2 text-sm text-base-content/70">
						<li><a href="#" class="hover:text-primary">Kratkoročno</a></li>
						<li><a href="#" class="hover:text-primary">Dugoročno</a></li>
						<li><a href="#" class="hover:text-primary">Poslovni prostori</a></li>
					</ul>
				</div>
				<div>
					<h6 class="font-semibold mb-4">Kontakt</h6>
					<ul class="space-y-2 text-sm text-base-content/70">
						<li>📞 +381 11 123 4567</li>
						<li>✉️ info@nekretnine.rs</li>
						<li>📍 Beograd, Srbija</li>
					</ul>
				</div>
			</div>
			<div class="border-t border-base-300 mt-8 pt-8 text-center text-sm text-base-content/50">
				<p>&copy; 2024 Luksuzne Nekretnine. Sva prava zadržana.</p>
			</div>
		</div>
	</footer>
</div>

