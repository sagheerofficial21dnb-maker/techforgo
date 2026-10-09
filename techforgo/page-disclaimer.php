<?php
/**
 * Template Name: Disclaimer
 * Description: Dedicated Disclaimer template clarifying educational nature of technical benchmarks.
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
						<span class="tfg-category-label"><?php esc_html_e( 'General Editorial Disclosures', 'techforgo' ); ?></span>
						<h1 class="tfg-archive-title"><?php esc_html_e( 'Disclaimer', 'techforgo' ); ?></h1>
						<p class="tfg-archive-description">
							<?php esc_html_e( 'Technical accuracy notice and professional engineering limitation disclaimer.', 'techforgo' ); ?>
						</p>
					</header>

					<div class="tfg-article-prose">
						<h2><?php esc_html_e( '1. Educational and Informational Content Only', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'All technical teardowns, driver examples, benchmark graphs, and architectural designs on TechForGo are published in good faith and for general informational and educational purposes only. TechForGo does not make any warranties about the completeness, reliability, and absolute accuracy of this information.', 'techforgo' ); ?></p>

						<h2><?php esc_html_e( '2. Professional Engineering Disclaimer', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'The site does not contain enterprise IT deployment guarantees or professional cybersecurity certifications. The technical information is provided for educational exploration. Any action you take upon the information you find on this website is strictly at your own risk.', 'techforgo' ); ?></p>

						<h2><?php esc_html_e( '3. External Links & Affiliations', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful websites, we have no control over the content and nature of these external sites.', 'techforgo' ); ?></p>

						<h2><?php esc_html_e( '4. Consent and Inquiries', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'By using our website, you hereby consent to our disclaimer and agree to its terms. If you require more information, reach us at sagheerofficial21dnb@gmail.com or 03069256639.', 'techforgo' ); ?></p>

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
