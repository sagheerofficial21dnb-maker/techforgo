<?php
/**
 * The header for TechForGo theme
 *
 * @package TechForGo
 * @since 1.0.1
 */

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'techforgo' ); ?></a>

<header id="masthead" class="tfg-site-header">
	<div class="tfg-container">
		<div class="tfg-header-inner">
			<!-- Left: Logo / Site Name: techforgo -->
			<div class="tfg-site-branding">
				<?php
				if ( has_custom_logo() ) :
					the_custom_logo();
				else :
					?>
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="tfg-brand" rel="home" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
						<img src="<?php echo esc_url( home_url( '/favicon.svg' ) ); ?>" alt="TechForGo Logo" style="width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;" />
						<span style="font-size: 20px; font-weight: 800; color: #0F172A;">
							<span style="font-weight: 900;">tech</span>forgo
						</span>
					</a>
					<?php
				endif;
				?>
			</div>

			<!-- Center: Primary Navigation (Desktop) -->
			<nav id="site-navigation" class="tfg-nav-desktop" aria-label="<?php esc_attr_e( 'Primary Navigation', 'techforgo' ); ?>">
				<?php
				if ( has_nav_menu( 'primary' ) ) :
					wp_nav_menu(
						array(
							'theme_location' => 'primary',
							'menu_id'        => 'primary-menu',
							'container'      => false,
							'menu_class'     => 'tfg-nav-list',
							'fallback_cb'    => false,
							'depth'          => 2,
						)
					);
				else :
					// Precise routing: Home -> front-page.php, Blog -> home.php
					$blog_page_id = get_option( 'page_for_posts' );
					$blog_url     = $blog_page_id ? get_permalink( $blog_page_id ) : home_url( '/blog/' );
					?>
					<ul class="tfg-nav-list">
						<li>
							<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="tfg-nav-link <?php echo is_front_page() ? 'active' : ''; ?>">
								<?php esc_html_e( 'Home', 'techforgo' ); ?>
							</a>
						</li>
						<li>
							<a href="<?php echo esc_url( $blog_url ); ?>" class="tfg-nav-link <?php echo ( is_home() && ! is_front_page() ) ? 'active' : ''; ?>">
								<?php esc_html_e( 'Blog', 'techforgo' ); ?>
							</a>
						</li>
						<li>
							<a href="<?php echo esc_url( home_url( '/category/artificial-intelligence/' ) ); ?>" class="tfg-nav-link <?php echo is_category( 'artificial-intelligence' ) ? 'active' : ''; ?>">
								<?php esc_html_e( 'AI & Models', 'techforgo' ); ?>
							</a>
						</li>
						<li>
							<a href="<?php echo esc_url( home_url( '/category/cloud-infrastructure/' ) ); ?>" class="tfg-nav-link <?php echo is_category( 'cloud-infrastructure' ) ? 'active' : ''; ?>">
								<?php esc_html_e( 'Cloud & DevOps', 'techforgo' ); ?>
							</a>
						</li>
						<li>
							<a href="<?php echo esc_url( home_url( '/category/cybersecurity/' ) ); ?>" class="tfg-nav-link <?php echo is_category( 'cybersecurity' ) ? 'active' : ''; ?>">
								<?php esc_html_e( 'Cyber Defense', 'techforgo' ); ?>
							</a>
						</li>
						<li>
							<a href="<?php echo esc_url( home_url( '/category/hardware-architecture/' ) ); ?>" class="tfg-nav-link <?php echo is_category( 'hardware-architecture' ) ? 'active' : ''; ?>">
								<?php esc_html_e( 'Hardware', 'techforgo' ); ?>
							</a>
						</li>
						<li>
							<a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="tfg-nav-link <?php echo is_page( 'about' ) ? 'active' : ''; ?>">
								<?php esc_html_e( 'About', 'techforgo' ); ?>
							</a>
						</li>
					</ul>
					<?php
				endif;
				?>
			</nav>

			<!-- Right: Search Icon/Field & Mobile Toggle -->
			<div class="tfg-header-actions">
				<!-- Desktop Quick Search Field -->
				<div class="tfg-header-search-desktop">
					<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
						<input type="search" placeholder="<?php esc_attr_e( 'Search topics...', 'techforgo' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
						<button type="submit" aria-label="<?php esc_attr_e( 'Search', 'techforgo' ); ?>">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
						</button>
					</form>
				</div>

				<!-- Mobile Search Toggle -->
				<button type="button" class="tfg-search-toggle" id="tfg-search-toggle-btn" aria-expanded="false" aria-controls="tfg-header-search-bar" aria-label="<?php esc_attr_e( 'Open Search', 'techforgo' ); ?>">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
				</button>

				<!-- Mobile Hamburger Menu Button (<768px) -->
				<button type="button" class="tfg-mobile-menu-btn" id="tfg-mobile-menu-toggle-btn" aria-expanded="false" aria-controls="tfg-mobile-drawer" aria-label="<?php esc_attr_e( 'Toggle Navigation Menu', 'techforgo' ); ?>">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
				</button>
			</div>
		</div>

		<!-- Mobile / Responsive Search Overlay -->
		<div id="tfg-header-search-bar" class="tfg-search-bar" style="display: none;">
			<form role="search" method="get" class="tfg-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<label class="screen-reader-text" for="tfg-header-search-input"><?php esc_html_e( 'Search articles', 'techforgo' ); ?></label>
				<input type="search" id="tfg-header-search-input" class="tfg-search-input" placeholder="<?php esc_attr_e( 'Type search query and press Enter...', 'techforgo' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
				<button type="submit" class="tfg-search-submit"><?php esc_html_e( 'Search', 'techforgo' ); ?></button>
			</form>
		</div>

		<!-- Mobile Slide-Out / Dropdown Drawer (<768px) -->
		<div id="tfg-mobile-drawer" class="tfg-mobile-drawer" style="display: none;">
			<?php
			$blog_page_id = get_option( 'page_for_posts' );
			$blog_url     = $blog_page_id ? get_permalink( $blog_page_id ) : home_url( '/blog/' );
			?>
			<nav class="tfg-mobile-nav" aria-label="<?php esc_attr_e( 'Mobile Navigation', 'techforgo' ); ?>">
				<div class="tfg-mobile-nav-group">
					<span class="tfg-mobile-group-title"><?php esc_html_e( 'Primary Menu', 'techforgo' ); ?></span>
					<ul class="tfg-mobile-nav-list">
						<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( $blog_url ); ?>"><?php esc_html_e( 'Blog Archive', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/category/artificial-intelligence/' ) ); ?>"><?php esc_html_e( 'Artificial Intelligence', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/category/cloud-infrastructure/' ) ); ?>"><?php esc_html_e( 'Cloud & DevOps', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/category/cybersecurity/' ) ); ?>"><?php esc_html_e( 'Cyber Defense', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/category/hardware-architecture/' ) ); ?>"><?php esc_html_e( 'Hardware Architecture', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/about/' ) ); ?>"><?php esc_html_e( 'About TechForGo', 'techforgo' ); ?></a></li>
					</ul>
				</div>

				<div class="tfg-mobile-nav-group tfg-mobile-legal-group">
					<span class="tfg-mobile-group-title"><?php esc_html_e( 'Editorial & Legal', 'techforgo' ); ?></span>
					<ul class="tfg-mobile-nav-list">
						<li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Contact & Bureaus', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>"><?php esc_html_e( 'Privacy Policy', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/terms/' ) ); ?>"><?php esc_html_e( 'Terms of Service', 'techforgo' ); ?></a></li>
					</ul>
				</div>
			</nav>
		</div>
	</div>
</header>

<!-- ARTICLE TICKER (Placed directly below header in vibrant green) -->
<section class="tfg-article-ticker" aria-label="<?php esc_attr_e( 'Latest Article Ticker', 'techforgo' ); ?>" style="background: #059669; border-bottom: 1px solid #047857; color: #FFFFFF; overflow: hidden;">
	<div class="tfg-ticker-inner" style="max-width: 1240px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; height: 40px;">
		<div class="tfg-ticker-label" style="display: flex; align-items: center; gap: 8px; padding-right: 14px; margin-right: 12px; border-right: 1px solid #10B981; background: #059669; z-index: 2;">
			<span class="tfg-ticker-dot" aria-hidden="true" style="width: 8px; height: 8px; border-radius: 50%; background: #6EE7B7; display: inline-block;"></span>
			<span style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; background: #047857; padding: 2px 8px; border-radius: 4px;"><?php esc_html_e( 'Latest', 'techforgo' ); ?></span>
		</div>

		<div class="tfg-ticker-marquee-wrap" style="flex: 1; overflow: hidden; position: relative;">
			<div class="tfg-ticker-marquee" style="display: flex; white-space: nowrap; gap: 16px;">
				<?php
				$ticker_posts = get_posts(
					array(
						'numberposts' => 8,
						'post_status' => 'publish',
					)
				);

				if ( ! empty( $ticker_posts ) ) :
					for ( $i = 0; $i < 2; $i++ ) :
						foreach ( $ticker_posts as $t_post ) :
							?>
							<span class="tfg-ticker-item" style="display: inline-flex; align-items: center; font-size: 12px;">
								<a href="<?php echo esc_url( get_permalink( $t_post->ID ) ); ?>" class="tfg-ticker-link" style="color: #FFFFFF; font-weight: 600; text-decoration: none; padding: 0 10px;">
									<?php echo esc_html( get_the_title( $t_post->ID ) ); ?>
								</a>
								<span class="tfg-ticker-sep" aria-hidden="true" style="color: #A7F3D0; font-weight: bold;">&bull;</span>
							</span>
							<?php
						endforeach;
					endfor;
				else :
					?>
					<span class="tfg-ticker-item" style="display: inline-flex; align-items: center; font-size: 12px;">
						<span class="tfg-ticker-link" style="color: #FFFFFF; font-weight: 600; padding: 0 10px;"><?php esc_html_e( 'Photonic Interconnects and Cryogenic Memory: Next Frontier in Quantum Data Centers', 'techforgo' ); ?></span>
						<span class="tfg-ticker-sep" style="color: #A7F3D0;">&bull;</span>
					</span>
					<span class="tfg-ticker-item" style="display: inline-flex; align-items: center; font-size: 12px;">
						<span class="tfg-ticker-link" style="color: #FFFFFF; font-weight: 600; padding: 0 10px;"><?php esc_html_e( 'Zero-Overhead Observability: Replacing Sidecars with eBPF Kernel Probes', 'techforgo' ); ?></span>
						<span class="tfg-ticker-sep" style="color: #A7F3D0;">&bull;</span>
					</span>
					<span class="tfg-ticker-item" style="display: inline-flex; align-items: center; font-size: 12px;">
						<span class="tfg-ticker-link" style="color: #FFFFFF; font-weight: 600; padding: 0 10px;"><?php esc_html_e( 'Hardware Root-of-Trust in the Post-Quantum Era: Lattice Enclaves on Silicon', 'techforgo' ); ?></span>
						<span class="tfg-ticker-sep" style="color: #A7F3D0;">&bull;</span>
					</span>
				<?php endif; ?>
			</div>
		</div>
	</div>
</section>
