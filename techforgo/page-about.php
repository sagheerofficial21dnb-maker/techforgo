<?php
/**
 * Template Name: About Us
 * Description: Dedicated About Us page template with editorial mission and masthead.
 *
 * @package TechForGo
 * @since 1.0.2
 */

get_header();
?>

<main id="primary" class="tfg-site-main">
	<div class="tfg-container">
		<?php get_template_part( 'template-parts/breadcrumbs' ); ?>

		<div class="tfg-layout-split">
			<div class="tfg-main-content">
				<article id="post-<?php the_ID(); ?>" <?php post_class( 'tfg-legal-article' ); ?>>
					<header class="tfg-page-header">
						<span class="tfg-category-label"><?php esc_html_e( 'Editorial Mission & Standards', 'techforgo' ); ?></span>
						<h1 class="tfg-archive-title"><?php esc_html_e( 'About TechForGo', 'techforgo' ); ?></h1>
						<p class="tfg-archive-description">
							<?php esc_html_e( 'An independent technology journal delivering rigorous architectural analysis, semiconductor teardowns, cloud scalability blueprints, and cybersecurity diagnostics.', 'techforgo' ); ?>
						</p>
					</header>

					<div class="tfg-article-prose">
						<h2><?php esc_html_e( 'Our Purpose & Editorial Intent', 'techforgo' ); ?></h2>
						<p>
							<?php esc_html_e( 'Founded to bridge the widening gap between high-level tech headlines and intricate low-level systems engineering, TechForGo provides engineers, researchers, and technology leaders with clear, peer-reviewed technical insights. We reject promotional fluff in favor of code-level examinations, verifiable benchmark methodologies, and objective architectural critiques.', 'techforgo' ); ?>
						</p>

						<h2><?php esc_html_e( 'Core Content Commitments', 'techforgo' ); ?></h2>
						<ul>
							<li><strong><?php esc_html_e( 'Independent Research:', 'techforgo' ); ?></strong> <?php esc_html_e( 'We maintain strict firewall separation between our editorial desk and any commercial sponsorship.', 'techforgo' ); ?></li>
							<li><strong><?php esc_html_e( 'Reproducible Benchmarks:', 'techforgo' ); ?></strong> <?php esc_html_e( 'Performance analyses include explicit environment specifications, compiler parameters, and test harnesses.', 'techforgo' ); ?></li>
							<li><strong><?php esc_html_e( 'Double-Blind Peer Review:', 'techforgo' ); ?></strong> <?php esc_html_e( 'High-complexity architectural manuscripts are evaluated by at least two domain specialists prior to publication.', 'techforgo' ); ?></li>
							<li><strong><?php esc_html_e( 'Transparent Errata:', 'techforgo' ); ?></strong> <?php esc_html_e( 'Any factual or technical inaccuracy identified after release is corrected immediately with a public revision note.', 'techforgo' ); ?></li>
						</ul>

						<?php the_content(); ?>
					</div>
				</article>
			</div>

			<?php get_sidebar(); ?>
		</div>
	</div>
</main>

<?php
get_footer();
