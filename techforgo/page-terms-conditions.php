<?php
/**
 * Template Name: Terms & Conditions
 * Description: Dedicated Terms & Conditions compliance template.
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
						<span class="tfg-category-label"><?php esc_html_e( 'Legal & Operational Standards', 'techforgo' ); ?></span>
						<h1 class="tfg-archive-title"><?php esc_html_e( 'Terms & Conditions', 'techforgo' ); ?></h1>
						<p class="tfg-archive-description">
							<?php esc_html_e( 'Rules and guidelines for accessing and utilizing the TechForGo engineering publication.', 'techforgo' ); ?>
						</p>
					</header>

					<div class="tfg-article-prose">
						<h2><?php esc_html_e( '1. Terms of Access', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'By accessing this website, we assume you accept these terms and conditions. Do not continue to use TechForGo if you do not agree to take all of the terms and conditions stated on this page.', 'techforgo' ); ?></p>

						<h2><?php esc_html_e( '2. Intellectual Property Rights', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'Unless otherwise stated, TechForGo and/or its licensors own the intellectual property rights for all editorial content and graphics on TechForGo. All intellectual property rights are reserved.', 'techforgo' ); ?></p>

						<h2><?php esc_html_e( '3. User Comments & Contributions', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'Comments reflected on TechForGo do not reflect the views and opinions of TechForGo, its agents, or affiliates. TechForGo reserves the right to monitor all comments and remove any comments that can be considered inappropriate or breach these Terms.', 'techforgo' ); ?></p>

						<h2><?php esc_html_e( '4. Disclaimer of Liability', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'In no event shall TechForGo, its authors, or editors be liable for any direct or indirect damages arising out of the use or inability to use the materials on this site.', 'techforgo' ); ?></p>

						<h2><?php esc_html_e( '5. Contact Support', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'For inquiries concerning our Terms of Service, contact sagheerofficial21dnb@gmail.com or 03069256639.', 'techforgo' ); ?></p>

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
